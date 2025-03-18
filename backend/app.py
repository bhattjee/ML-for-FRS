# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.preprocessing import OneHotEncoder, StandardScaler
import joblib
import numpy as np

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Load the pre-trained model, encoder, and scaler
model = joblib.load(r'C:\Users\jbhat\OneDrive\Desktop\PROJECT\Demos\Fitness_AI\fitness-recommendation\backend\model.pkl')
encoder = joblib.load(r'C:\Users\jbhat\OneDrive\Desktop\PROJECT\Demos\Fitness_AI\fitness-recommendation\backend\encoder.pkl')
scaler = joblib.load(r'C:\Users\jbhat\OneDrive\Desktop\PROJECT\Demos\Fitness_AI\fitness-recommendation\backend\scaler.pkl')

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json
        print("Received data:", data)

        if not isinstance(data, dict):  # Ensure it's a dictionary
            return jsonify({"error": "Invalid input format. Expected a JSON object."}), 400

        # Define required features and default values
        required_features = {
            'name': '',
            'age': 0,
            'gender': 'Unknown',
            'weight': 0,
            'height': 0,
            'fitnessGoals': 'Unknown',
            'experienceLevel': 'Unknown',
            'medicalConditions': 'None',
            'preferredDuration': 0,
            'availableDays': 20,  
            'equipmentAvailability': 'Unknown',
            'duration': 0,
            'exerciseId': 0
        }

        # Ensure all required features are present
        for feature, default_value in required_features.items():
            data.setdefault(feature, default_value)

        # Convert input to DataFrame
        df = pd.DataFrame([data])

        categorical_features = ['fitnessGoals', 'experienceLevel', 'equipmentAvailability', 'gender', 'medicalConditions']
        numerical_features = ['age', 'weight', 'height', 'duration', 'exerciseId', 'availableDays']

        # One-hot encoding
        encoded_features = encoder.transform(df[categorical_features]).toarray()
        encoded_df = pd.DataFrame(encoded_features, columns=encoder.get_feature_names_out(categorical_features))

        # Normalize numerical features
        df[numerical_features] = scaler.transform(df[numerical_features])

        # Merge categorical & numerical features
        df_encoded = pd.concat([df[numerical_features], encoded_df], axis=1)

        expected_features = numerical_features + list(encoder.get_feature_names_out(categorical_features))
        df_encoded = df_encoded[expected_features]

        # Convert to NumPy array
        input_data = df_encoded.values

        # Generate recommendations
        recommendations = model.predict(input_data)

        # Ensure recommendations is always a list
        if isinstance(recommendations, np.ndarray):
            recommendations = recommendations.tolist()
        elif not isinstance(recommendations, list):
            recommendations = [recommendations]  

        return jsonify({"recommendations": recommendations}), 200

    except Exception as e:
        print("Full Error Traceback:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
