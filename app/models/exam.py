from app.extensions import db

class Exam(db.Model):
    __tablename__ = 'exams'  # Optional: adds clarity

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    subject = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'subject': self.subject
        }
