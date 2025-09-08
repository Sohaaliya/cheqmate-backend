import time
from flask import current_app
from app import socketio
from flask_socketio import emit

def detect_unauthorized_behavior():
    """
    Example background task. Replace the body with real checks:
    face detection, multiple faces, etc. Use current_app.app_context()
    if you need DB access.
    """
    while True:
        # Example: emit a test alert every 10 seconds
        socketio.emit("alert", {"message": "⚠️ Example alert from server"}, broadcast=True)
        time.sleep(10)

# Socket event handlers
@socketio.on("connect")
def handle_connect():
    print("Client connected:", getattr(current_app, "name", None))
    emit("connected", {"message": "Welcome!"})

@socketio.on("disconnect")
def handle_disconnect():
    print("Client disconnected")

# Start background task when server starts via before_first_request in run.py or create_app
def start_background_tasks():
    # start a background task (non-blocking)
    socketio.start_background_task(detect_unauthorized_behavior)
