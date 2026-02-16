
from flask import Flask, request, jsonify
from flask_cors import CORS
from google.oauth2 import id_token
from google.auth.transport import requests

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# IMPORTANT: Replace with your actual Client ID from Google Cloud Console
GOOGLE_CLIENT_ID = "360653950042-ecngva4k4qen0is78f5f0qvn9a0deg3j.apps.googleusercontent.com"

@app.route('/api/auth/google', methods=['POST'])
def google_auth():
    """
    Verifies the Google ID Token sent from the frontend.
    """
    data = request.json
    token = data.get('token')

    if not token:
        return jsonify({"error": "No token provided"}), 400

    try:
        # Verify the ID token using Google's verification library
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)

        # ID token is valid. Get the user's Google ID, email, name, etc.
        user_id = idinfo['sub']
        email = idinfo['email']
        name = idinfo.get('name')
        picture = idinfo.get('picture')

        # Here you would typically check if the user exists in your DB,
        # create a session (JWT), and return user info.
        return jsonify({
            "status": "success",
            "user": {
                "id": user_id,
                "email": email,
                "name": name,
                "picture": picture
            }
        }), 200

    except ValueError as e:
        # Invalid token
        return jsonify({"error": str(e)}), 401
    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    # Use a secure port or default 5000
    app.run(port=5000, debug=True)
