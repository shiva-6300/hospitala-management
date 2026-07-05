import React, { useEffect, useState } from 'react';

function PatientList({ refreshFlag }) {
  const [patients, setPatients] = useState([]);

  // Function to fetch patients from backend
  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:8080/patients');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  // useEffect runs whenever refreshFlag changes (including on first page load)
  useEffect(() => {
    fetchPatients();
  }, [refreshFlag]);

  return (
    <div>
      <h3>Patient List</h3>
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PatientList;
