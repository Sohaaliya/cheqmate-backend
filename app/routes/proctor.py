from flask import Blueprint, request, jsonify
import face_recognition
import numpy as np
from PIL import Image
import io
import os

proctor_bp = Blueprint('proctor', __name__)

@proctor_bp.route('/check_frame', methods=['POST'])
def check_frame():
    user_id = request.form.get('user_id')
    if not user_id:
        return jsonify({'message': 'Missing user_id'}), 400

    if 'frame' not in request.files:
        return jsonify({'message': 'No frame uploaded'}), 400

    # Load reference image
    reference_path = f'registered_faces/{user_id}.jpg'
    if not os.path.exists(reference_path):
        return jsonify({'message': 'Reference image not found'}), 404

    reference_image = face_recognition.load_image_file(reference_path)
    reference_encoding = face_recognition.face_encodings(reference_image)
    if not reference_encoding:
        return jsonify({'message': 'No face found in reference image'}), 400

    # Load uploaded frame
    frame_file = request.files['frame']
    image_pil = Image.open(io.BytesIO(frame_file.read())).convert('RGB')
    frame_np = np.array(image_pil)

    # Detect and encode face in uploaded frame
    face_locations = face_recognition.face_locations(frame_np)
    face_encodings = face_recognition.face_encodings(frame_np, face_locations)

    if not face_encodings:
        return jsonify({'verified': False, 'message': 'No face detected in frame'}), 200

    result = face_recognition.compare_faces([reference_encoding[0]], face_encodings[0])
    verified = result[0]

    return jsonify({'verified': verified}), 200
