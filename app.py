from flask import Flask, request, jsonify
import re

app = Flask(__name__)

# Helper function to process input data
def process_input(data):
    numbers = []
    alphabets = []
    for item in data:
        if isinstance(item, str) and item.isalpha():
            alphabets.append(item)
        elif isinstance(item, (int, float)) or (isinstance(item, str) and item.isdigit()):
            numbers.append(int(item))
    return numbers, alphabets

@app.route("/bfhl", methods=["POST"])
def handle_post():
    try:
        req_data = request.get_json()
        if not req_data or "name" not in req_data or "dob" not in req_data or "data" not in req_data:
            return jsonify({"is_success": False, "message": "Invalid request format"}), 400
        
        full_name = req_data["name"].strip().replace(" ", "_").lower()
        dob = req_data["dob"]
        if not re.match(r'\d{2}-\d{2}-\d{4}', dob):
            return jsonify({"is_success": False, "message": "Invalid DOB format. Use DD-MM-YYYY"}), 400
        
        user_id = f"{full_name}_{dob.replace('-', '')}"
        numbers, alphabets = process_input(req_data["data"])
        
        response = {
            "is_success": True,
            "user_id": user_id,
            "email": req_data.get("email", ""),
            "college_roll_number": req_data.get("roll_number", ""),
            "numbers": numbers,
            "alphabets": alphabets
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"is_success": False, "message": str(e)}), 500

@app.route("/bfhl", methods=["GET"])
def handle_get():
    return jsonify({"operation_code": 1}), 200

if __name__ == "__main__":
    app.run(debug=True)
