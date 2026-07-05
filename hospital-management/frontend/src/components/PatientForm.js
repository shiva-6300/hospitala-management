import React, { useState } from 'react';

function PatientForm({ onPatientAdded }) {
  // Local state to hold form input values
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the page from refreshing

    // Basic validation: don't submit if fields are empty
    if (!name || !age) {
      alert('Please fill in all fields');
      return;
    }

    const newPatient = {
      name: name,
      age: parseInt(age),
      gender: gender
    };

    try {
      // Send POST request to backend to create a patient
      const response = await fetch('http://localhost:8080/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPatient)
      });

      if (response.ok) {
        // Clear the form
        setName('');
        setAge('');
        setGender('Male');
        // Tell the parent component (App.js) that a patient was added
        onPatientAdded();
      } else {
        alert('Failed to add patient');
      }
    } catch (error) {
      console.error('Error adding patient:', error);
      alert('Could not connect to backend server');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Patient</h3>

      <input
        type="text"
        placeholder="Patient Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <button type="submit">Add Patient</button>
    </form>
  );
}

export default PatientForm;
