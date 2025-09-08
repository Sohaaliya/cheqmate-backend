# iface.py
from PIL import Image
import numpy as np
import face_recognition
import cv2

# ---- Existing iface.py functions (if any) ----
# example:
def encode_image_bytes(image_bytes):
    img = face_recognition.load_image_file(io.BytesIO(image_bytes))
    encs = face_recognition.face_encodings(img)
    return encs[0] if encs else None

# ---- Merged code from old face_verification.py ----
# If you had something like this in the old file:
# image_pil = Image.open("meeeeee.jpg").convert("RGB")
# reference_image = np.array(image_pil)
# reference_encoding = face_recognition.face_encodings(reference_image)[0]
# ...
# Place it here inside functions instead of running at import.

def verify_live_with_reference(reference_image_path="meeeeee.jpg"):
    image_pil = Image.open(reference_image_path).convert("RGB")
    reference_image = np.array(image_pil)
    reference_encoding = face_recognition.face_encodings(reference_image)[0]

    video = cv2.VideoCapture(0)
    while True:
        ret, frame = video.read()
        rgb = frame[:, :, ::-1]
        faces = face_recognition.face_locations(rgb)
        encodings = face_recognition.face_encodings(rgb, faces)

        for encoding in encodings:
            results = face_recognition.compare_faces([reference_encoding], encoding)
            if results[0]:
                cv2.putText(frame, "Verified", (10, 30),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            else:
                cv2.putText(frame, "Unverified", (10, 30),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

        cv2.imshow("Webcam", frame)
        if cv2.waitKey(1) == ord('q'):
            break

    video.release()
    cv2.destroyAllWindows()
