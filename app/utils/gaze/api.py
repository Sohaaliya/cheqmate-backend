# app/utils/gaze/api.py
import io
import cv2
import numpy as np

def analyze_gaze_from_bytes(image_bytes):
    """
    Placeholder gaze analysis.
    You can replace with your teammate's gaze tracking logic later.
    """
    try:
        # Convert bytes → OpenCV image
        file_bytes = np.asarray(bytearray(image_bytes), dtype=np.uint8)
        img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
        if img is None:
            return {"status": "error", "error": "Invalid image data"}

        # For now, just return 'center' as default.
        return {"status": "center"}

    except Exception as e:
        return {"status": "error", "error": str(e)}
