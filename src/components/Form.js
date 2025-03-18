// src/components/Form.js
import React, { useState } from 'react';
import axios from 'axios';

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    fitnessGoals: '',
    experienceLevel: '',
    medicalConditions: '',
    preferredDuration: '',
    availableDays: '',
    equipmentAvailability: '',
    duration: '',
    exerciseId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert numeric fields to numbers
    const numericFields = ['age', 'weight', 'height', 'preferredDuration', 'availableDays', 'duration', 'exerciseId'];
    setFormData({
      ...formData,
      [name]: numericFields.includes(name) ? (value ? parseInt(value, 10) : '') : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure default values for required numeric fields
    const formattedData = {
      ...formData,
      availableDays: formData.availableDays || 20, // Default to 20 if empty
      duration: formData.duration || 30, // Default to 30 mins
      exerciseId: formData.exerciseId || 1 // Default exercise ID (must exist in DB)
    };

    try {
      const response = await axios.post('http://localhost:5000/recommend', formattedData);
      onSubmit(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" onChange={handleChange} />
      </label>
      <label>
        Age:
        <input type="number" name="age" onChange={handleChange} />
      </label>
      <label>
        Gender:
        <select name="gender" onChange={handleChange}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>
        Weight:
        <input type="number" name="weight" onChange={handleChange} />
      </label>
      <label>
        Height:
        <input type="number" name="height" onChange={handleChange} />
      </label>
      <label>
        Fitness Goals:
        <select name="fitnessGoals" onChange={handleChange}>
          <option value="">Select</option>
          <option value="weightLoss">Weight Loss</option>
          <option value="muscleGain">Muscle Gain</option>
          <option value="endurance">Endurance</option>
          <option value="generalFitness">General Fitness</option>
        </select>
      </label>
      <label>
        Experience Level:
        <select name="experienceLevel" onChange={handleChange}>
          <option value="">Select</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </label>
      <label>
        Medical Conditions:
        <input type="text" name="medicalConditions" onChange={handleChange} />
      </label>
      <label>
        Preferred Workout Duration:
        <select name="preferredDuration" onChange={handleChange}>
          <option value="">Select</option>
          <option value="30">30 mins</option>
          <option value="45">45 mins</option>
          <option value="60">60 mins</option>
        </select>
      </label>
      <label>
        Available Days (20-28):
        <input type="number" name="availableDays" min="20" max="28" onChange={handleChange} />
      </label>
      <label>
        Equipment Availability:
        <select name="equipmentAvailability" onChange={handleChange}>
          <option value="">Select</option>
          <option value="gym">Gym</option>
          <option value="home">Home</option>
          <option value="none">None</option>
        </select>
      </label>
      <label>
        Exercise ID:
        <input type="number" name="exerciseId" onChange={handleChange} />
      </label>
      <label>
        Workout Duration:
        <input type="number" name="duration" onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
