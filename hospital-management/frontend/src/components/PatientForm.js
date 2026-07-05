import React, { useState } from 'react';

function PatientForm({ onPatientAdded }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !age) {
      alert('Please fill in all fields');
      return;
    }

    const newPatient = {
      name,
      age: parseInt(age),
      gender
    };

    try {
      const response = await fetch('http://52.66.177.87:8080/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPatient)
      });

      if (response.ok) {
        setName('');
        setAge('');
        setGender('Male');
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
        required
      />

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />

      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <button type="submit">Add Patient</button>
    </form>
  );
}

export default PatientForm;
