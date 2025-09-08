import os
import numpy as np
from PIL import Image

try:
    import face_recognition
except ImportError:
    face_recognition = None

UPLOAD_FOLDER = 'face_data'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def save_face_image(username, image_data):
    path = os.path.join(UPLOAD_FOLDER, f"{username}.jpg")
    with open(path, 'wb') as f:
        f.write(image_data)
    return path

def encode_face(image_path):
    if face_recognition is None:
        raise RuntimeError("face_recognition library is not available. Please install it first.")
    
    image = face_recognition.load_image_file(image_path)
    encodings = face_recognition.face_encodings(image)
    
    if not encodings:
        raise ValueError("No face found in the image.")
    
    return encodings[0]

def compare_faces(known_encoding, unknown_encoding):
    if face_recognition is None:
        raise RuntimeError("face_recognition library is not available.")
    
    results = face_recognition.compare_faces([known_encoding], unknown_encoding)
    return results[0]
