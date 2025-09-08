from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.exam import Exam

exams_bp = Blueprint('exams', __name__)


@exams_bp.route('/exam', methods=['POST'])
def create_exam():
    data = request.get_json()
    name = data.get('name')
    subject = data.get('subject')

    if not name or not subject:
        return jsonify({'message': 'Missing name or subject'}), 400

    new_exam = Exam(name=name, subject=subject)
    db.session.add(new_exam)
    db.session.commit()

    return jsonify({'message': 'Exam created successfully', 'exam': new_exam.to_dict()}), 201

@exams_bp.route('/exam', methods=['GET'])
def list_exams():
    exams = Exam.query.all()
    return jsonify([exam.to_dict() for exam in exams]), 200
