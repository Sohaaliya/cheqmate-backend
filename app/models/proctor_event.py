# app/models/proctor_event.py
from app.extensions import db
from datetime import datetime

class ProctorEvent(db.Model):
    __tablename__ = 'proctor_events'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=True)
    exam_id = db.Column(db.Integer, nullable=True)   # optional link to exam table
    event_type = db.Column(db.String(80), nullable=False)  # e.g. "no_face", "multi_face", "gaze_away", "face_mismatch"
    details = db.Column(db.Text, nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "exam_id": self.exam_id,
            "event_type": self.event_type,
            "details": self.details,
            "timestamp": self.timestamp.isoformat()
        }
