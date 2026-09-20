# ML-for-FRS (Machine Learning Model for Fitness Recommendation System)

An intelligent machine learning-powered system that delivers personalized fitness recommendations. The system leverages advanced neural networks to analyze comprehensive user profiles (age, weight, fitness goals, experience level, medical conditions, equipment availability) and predict optimal exercise recommendations tailored to individual needs.

## Machine Learning Architecture

### Core ML Components
- **MLPClassifier (Multi-Layer Perceptron)** - Neural network-based classifier with 100 hidden neurons for predicting optimal exercise recommendations
- **OneHotEncoder** - Handles categorical feature encoding for fitness goals, experience levels, equipment types, gender, and medical conditions
- **StandardScaler** - Normalizes numerical features (age, weight, height, duration, exercise ID, available days) for optimal model performance
- **Train-Test Split** - 80/20 split with random_state=42 for reproducible results

### Model Training Pipeline
1. **Data Preprocessing**: Categorical features encoded using OneHotEncoder, numerical features scaled using StandardScaler
2. **Feature Engineering**: Combines encoded categorical features with scaled numerical features into a unified feature matrix
3. **Neural Network Training**: MLPClassifier with optimized hyperparameters:
   - Hidden layer architecture: (100,)
   - Maximum iterations: 1000
   - Learning rate: 0.01
   - Early stopping enabled to prevent overfitting
   - Validation fraction: 10% of training data
   - Patience: 10 iterations without improvement
4. **Model Persistence**: Trained model, encoder, and scaler serialized using joblib for production deployment

### Prediction Workflow
1. User submits fitness profile through web interface
2. Input data preprocessed using saved encoder and scaler
3. Model predicts exercise IDs based on learned patterns
4. Recommendations returned via REST API with real-time response

## Tech Stack

### Machine Learning & Data Science
- **scikit-learn 1.3.2** - Core ML library for model training and preprocessing
- **pandas 2.1.4** - Data manipulation and analysis
- **numpy 1.26.2** - Numerical computing and array operations
- **joblib 1.3.2** - Model serialization and persistence

### Backend API
- **Flask 3.0.0** - Lightweight Python web framework for REST API
- **Flask-CORS 4.0.0** - Cross-origin resource sharing for frontend-backend communication

### Frontend Interface
- **React 19** - Modern UI framework for responsive user interface
- **Axios 1.8.3** - HTTP client for API communication
- **Chart.js 4.4.8 & react-chartjs-2 5.3.0** - Interactive data visualization
- **jsPDF 3.0.0 & PDFKit 0.16.0** - PDF report generation

## Project Structure

```
fitness-recommendation/
├── backend/
│   ├── app.py              # Flask API server
│   ├── models.py           # ML model training script
│   ├── model.pkl           # Trained model (gitignored)
│   ├── encoder.pkl         # Feature encoder (gitignored)
│   ├── scaler.pkl          # Feature scaler (gitignored)
│   └── exercise_data.csv   # Training dataset
├── src/
│   ├── components/
│   │   ├── Form.js         # User input form
│   │   └── Recommendations.js # Results display
│   ├── App.js              # Main application component
│   └── index.js            # React entry point
├── public/                 # Static assets
├── package.json           # Frontend dependencies
└── requirements.txt        # Backend dependencies
```

## Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **pip** (Python package manager)

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd fitness-recommendation
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
pip install -r requirements.txt
```

### 4. Train the ML Model (First time only)
```bash
cd backend
python models.py
```
This will generate `model.pkl`, `encoder.pkl`, and `scaler.pkl` files.

## Running the Application

### Start the Backend Server
```bash
cd backend
python app.py
```
The backend will run on `http://localhost:5000`

### Start the Frontend Development Server
In a new terminal:
```bash
npm start
```
The frontend will run on `http://localhost:3000`

## API Endpoints

### POST /recommend
Accepts user fitness data and returns exercise recommendations.

**Request Body:**
```json
{
  "name": "John Doe",
  "age": 30,
  "gender": "male",
  "weight": 75,
  "height": 175,
  "fitnessGoals": "weightLoss",
  "experienceLevel": "intermediate",
  "medicalConditions": "None",
  "preferredDuration": 45,
  "availableDays": 25,
  "equipmentAvailability": "gym",
  "duration": 30,
  "exerciseId": 1
}
```

**Response:**
```json
{
  "recommendations": [1, 5, 8, 12]
}
```

## Features

### Machine Learning Capabilities
- **Neural Network-Based Predictions**: MLPClassifier model trained on comprehensive fitness dataset
- **Intelligent Feature Engineering**: Automatic encoding and scaling of mixed data types
- **Adaptive Learning**: Model continuously improves with additional training data
- **Real-Time Inference**: Sub-second prediction latency for seamless user experience

### User Experience
- **Personalized Recommendations**: AI-powered exercise suggestions tailored to individual profiles
- **Multi-Factor Analysis**: Considers 12+ features including demographics, goals, experience, equipment, and medical conditions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Data Visualization**: Interactive charts to display recommendation results
- **PDF Export**: Generate downloadable fitness reports

## Machine Learning Model Details

### Dataset
The system is trained on `exercise_data.csv` containing comprehensive fitness data including user demographics, fitness goals, experience levels, and corresponding exercise recommendations.

### Feature Engineering
**Categorical Features** (One-Hot Encoded):
- fitnessGoals: weightLoss, muscleGain, endurance, generalFitness
- experienceLevel: beginner, intermediate, advanced
- equipmentAvailability: gym, home, none
- gender: male, female, other
- medicalConditions: Various medical conditions

**Numerical Features** (Standard Scaled):
- age: User age in years
- weight: User weight in kg
- height: User height in cm
- duration: Workout duration in minutes
- exerciseId: Exercise identifier
- availableDays: Number of available days per month (20-28)

### Model Performance
- **Algorithm**: Multi-Layer Perceptron (Neural Network)
- **Architecture**: Single hidden layer with 100 neurons
- **Optimization**: Adam optimizer with learning rate 0.01
- **Regularization**: Early stopping with 10-iteration patience
- **Validation**: 10% validation split for early stopping detection

## Security Notes

- Model files (`.pkl`) are excluded from version control via `.gitignore`
- Hardcoded absolute paths have been removed for portability
- CORS is enabled for development (restrict in production)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
