// src/App.js
import React, { useState } from 'react';
import Form from './components/Form';
import Recommendations from './components/Recommendations';
import axios from 'axios';

function App() {
  const [recommendations, setRecommendations] = useState(null);

  const handleFormSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/recommend', formData);
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="App">
      <h1>Fitness Recommendation System</h1>
      <Form onSubmit={handleFormSubmit} />
      {recommendations && <Recommendations recommendations={recommendations} />}
    </div>
  );
}

export default App;