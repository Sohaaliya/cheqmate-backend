
from app.utils.face_recognition import save_face_image, encode_face, compare_faces
import os
import uuid
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename


upload_bp = Blueprint('upload', __name__)
UPLOAD_FOLDER = 'static/faces'

@upload_bp.route('/upload_face', methods=['POST'])
def upload_face():
    if 'file' not in request.files or 'user_id' not in request.form:
        return jsonify({'message': 'No file or user ID provided'}), 400

    file = request.files['file']
    user_id = request.form['user_id']

    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    filename = secure_filename(f"{user_id}_{uuid.uuid4().hex}.jpg")
    filepath = os.path.join(UPLOAD_FOLDER, filename)

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    file.save(filepath)

    success = save_and_encode_face(filepath, user_id)

    if not success:
        os.remove(filepath)
        return jsonify({'message': 'No face detected'}), 400

    return jsonify({'message': 'Face uploaded and encoded successfully'}), 200
upload_bp = Blueprint('upload', __name__)
@upload_bp.route('/upload_face', methods=['POST'])
def upload_face():
    ...
