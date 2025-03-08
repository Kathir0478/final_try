import os
from dotenv import load_dotenv
import google.generativeai as genai
from flask import Flask, jsonify, request
from flask_cors import CORS
import json
# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load API key from .env
load_dotenv()
api_key = os.getenv("GEN_AI_KEY")
genai.configure(api_key=api_key)

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Service is running!"}), 200


@app.route('/', methods=['POST'])
def fetch():
    req = request.get_json()
    if not req:
        return jsonify({"message": "No data provided"}), 400

    model = genai.GenerativeModel("gemini-1.5-pro-latest")

    prompt = f"""
    For a home fitness app, a user has provided the following details:  

    - **Age**: {req.get("age")}
    - **Gender**: {req.get("gender")}
    - **Training Frequency**: {req.get("frequency")} days per week  
    - **Fitness Goal**: {req.get("goal")}
    - **Medical State**: {req.get("description")}  
    - **Height**: {req.get("height")} 
    - **Weight**: {req.get("weight")} 
    - **Additional Details**: {req.get("description")}  
    - **Fitness Level** : {req.get("fitnesslevel")}

    ### **Task**  
    Generate a **structured workout schedule** that fits within the given frequency in days and the workout must be suitable for homeworkout considering the fact of equipment limitations, while aligning with the goal and preference and considering the Fitness Level, height ,weight, age, gender and medical being, the result must only has frequency days give it has numbered days not specifying the weekdays and don't give rest days.  

    ### **Response Format (Strictly Follow This Format)**  
    Provide the response ONLY in the following **JSON structure**, without any additional text or explanation:  

    ```json structure
    {{
    "Day": [
        {{"exercise": "Exercise Name in short",
        "guide": "Description of how to do the exercises (Don't mention to refer pervious days)",
        "time": "Total number of single reps as a whole number only the number needed",
        "reward":"Suitable rating of this exercise out of 100"   }},...
    ],...
    }}
    """
    response = model.generate_content(prompt)

    try:
        response_text = response.text.strip()  # Ensure the response is clean
        
        # ✅ Extract only the JSON part from the response
        json_start = response_text.find('{')  # Find first {
        json_end = response_text.rfind('}')   # Find last }

        if json_start == -1 or json_end == -1:
            raise ValueError("Response does not contain valid JSON")

        json_content = response_text[json_start:json_end + 1]  # Extract JSON part

        # ✅ Ensure JSON parsing works
        workout_plan = json.loads(json_content)

        return jsonify({"workout_plan": workout_plan})
    except Exception as e:
        return jsonify({"error": "Invalid response format", "details": str(e)}), 500

if __name__ == "__main__": 
    app.run(debug=True, port=5001)