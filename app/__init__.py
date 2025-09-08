from flask import Flask
from config import Config
from app.routes.auth import auth_bp
from app.routes.exams import exams_bp
from app.routes.proctor import proctor_bp
from app.routes.upload_face import upload_bp
from app.extensions import db, migrate, socketio
import os

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cheqmate.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'secret!')

    db.init_app(app)
    migrate.init_app(app, db)
    socketio.init_app(app)

    # Models import to register them with SQLAlchemy
    from app.models import user, exam, proctor_event

    # Routes import and register blueprints
    app.register_blueprint(auth_bp,   url_prefix="/api")
    app.register_blueprint(exams_bp,  url_prefix="/api")
    app.register_blueprint(proctor_bp, url_prefix="/api")
    app.register_blueprint(upload_bp, url_prefix="/api")

    @app.route("/")
    def hello():
        return "Flask is working"

    # ✅ Debug: print registered routes
    print("✅ Blueprints registered:", app.blueprints.keys())
    for rule in app.url_map.iter_rules():
        print("➡️", rule)

    return app


# 👇 Keep this at bottom
app = create_app()
