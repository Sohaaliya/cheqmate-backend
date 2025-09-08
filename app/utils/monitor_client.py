import time
import pyautogui
from pynput import keyboard
from datetime import datetime
import pygetwindow as gw
import socketio
import threading

# Connect to Flask-SocketIO backend
sio = socketio.Client()
try:
    sio.connect("http://192.168.137.216:5000")  # Replace with your actual server IP if needed
except Exception as e:
    print("[ERROR] Socket connection failed:", e)

def send_alert(message):
    print("Sending alert:", message)
    sio.emit("alert", {"message": message})
    take_screenshot(message)

def take_screenshot(reason):
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"screenshot_{timestamp}.png"
    screenshot = pyautogui.screenshot()
    screenshot.save(filename)
    print(f"[INFO] Screenshot taken due to: {reason}")

# -------------------
# Keyboard Monitoring
# -------------------

def on_press(key):
    try:
        # Check for forbidden keys
        if key in [keyboard.Key.alt_l, keyboard.Key.tab, keyboard.Key.ctrl_l, keyboard.Key.esc]:
            send_alert(f"⚠️ Forbidden key pressed: {key}")
        else:
            print(f"Key pressed: {key}")
    except Exception as e:
        print(f"[ERROR] Key logging failed: {e}")

def start_keyboard_monitoring():
    listener = keyboard.Listener(on_press=on_press)
    listener.daemon = True
    listener.start()

# -------------------
# Screen Monitoring
# -------------------

last_window_title = ""

def start_screen_monitoring():
    global last_window_title
    while True:
        try:
            active_window = gw.getActiveWindow()
            if active_window:
                title = active_window.title
                if title != last_window_title:
                    last_window_title = title
                    print(f"Active window changed: {title}")
                    if "exam" not in title.lower() and "chrome" not in title.lower():
                        send_alert(f"⚠️ Window/tab switched to: {title}")
            else:
                print("No active window detected.")

        except Exception as e:
            print(f"[ERROR] Screen monitoring failed: {e}")

        time.sleep(1)  # Fast check, but screenshots are only taken if alert is triggered

# -------------------
# Main
# -------------------

if __name__ == "__main__":
    print("[INFO] Proctor monitoring started.")
    start_keyboard_monitoring()
    start_screen_monitoring()
