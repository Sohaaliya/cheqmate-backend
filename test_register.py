import requests

url = "http://127.0.0.1:5000/api/register"

payload = {
    "username": "testuser",
    "password": "1234"
}

headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)

print("Status Code:", response.status_code)
print("Response:", response.json())
