from flask import Blueprint, request, jsonify
from app.utils.face_recognition import save_face_image, encode_face
from app.models.user import User
from app import db

face_bp = Blueprint('face', __name__)

@face_bp.route('/upload_face', methods=['POST'])
def upload_face():
    username = request.form.get('username')
    file = request.files.get('image')

    if not username or not file:
        return jsonify({'message': 'Username and image are required'}), 400

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    image_data = file.read()
    image_path = save_face_image(username, image_data)
    encoding = encode_face(image_path)

    if encoding is None:
        return jsonify({'message': 'No face detected in the image'}), 400

    # Save encoding in database or file (optional step)

    return jsonify({'message': 'Face uploaded and encoded successfully'}), 200
