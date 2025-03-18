# models.py
import pandas as pd
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
import joblib
import os

def preprocess_data(df):
    # Preprocess the data
    encoder = OneHotEncoder(handle_unknown='ignore')  # Handle unknown categories
    scaler = StandardScaler()

    # Separate categorical and numerical features
    categorical_features = ['fitnessGoals', 'experienceLevel', 'equipmentAvailability', 'gender', 'medicalConditions',]
    numerical_features = ['age', 'weight', 'height', 'duration', 'exerciseId','availableDays']

    # Encode categorical features
    encoded_features = encoder.fit_transform(df[categorical_features])
    encoded_df = pd.DataFrame(encoded_features.toarray(), columns=encoder.get_feature_names_out(categorical_features))

    # Normalize numerical features
    numerical_df = df[numerical_features]
    scaled_numerical_df = pd.DataFrame(scaler.fit_transform(numerical_df), columns=numerical_features)

    # Combine encoded and scaled features
    df_encoded = pd.concat([scaled_numerical_df, encoded_df], axis=1)

    return df_encoded, encoder, scaler

def train_model(df):
    # Preprocess the data
    df_encoded, encoder, scaler = preprocess_data(df)

    # Split the data
    X = df_encoded
    y = df['exerciseId']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train the model
    model = MLPClassifier(
        hidden_layer_sizes=(100,),
        max_iter=1000,  # Increase the number of iterations
        learning_rate_init=0.01,  # Adjust the learning rate
        early_stopping=True,  # Enable early stopping
        validation_fraction=0.1,  # Fraction of training data to use for validation
        n_iter_no_change=10  # Number of iterations with no improvement to wait before stopping
    )
    model.fit(X_train, y_train)

    # Save the model, encoder, and scaler
    model_path = 'model.pkl'
    encoder_path = 'encoder.pkl'
    scaler_path = 'scaler.pkl'
    joblib.dump(model, model_path)
    joblib.dump(encoder, encoder_path)
    joblib.dump(scaler, scaler_path)

    print(f"Model saved to {os.path.abspath(model_path)}")
    print(f"Encoder saved to {os.path.abspath(encoder_path)}")
    print(f"Scaler saved to {os.path.abspath(scaler_path)}")

if __name__ == '__main__':
    # Load the dataset
    script_dir = os.path.dirname(__file__)  # Get the directory of the script
    file_path = os.path.join(script_dir, 'exercise_data.csv')  # Combine script directory with file name

    df = pd.read_csv(file_path)
    print("Training data columns:", df.columns.tolist())
    train_model(df)