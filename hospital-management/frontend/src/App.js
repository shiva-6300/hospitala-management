import React, { useState } from 'react';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';

function App() {
  // This counter is used to tell PatientList "please refresh your data"
  // Every time a new patient is added, we increase this number,
  // which causes PatientList to re-fetch patients from the backend.
  const [refreshFlag, setRefreshFlag] = useState(0);

  const handlePatientAdded = () => {
    setRefreshFlag(prev => prev + 1);
  };

  return (
    <div className="app-container">
      <h1>Hospital Management System</h1>
      <p>Simple Patient Management Module</p>

      {/* Form to add a new patient */}
      <PatientForm onPatientAdded={handlePatientAdded} />

      {/* List showing all patients, refreshes when refreshFlag changes */}
      <PatientList refreshFlag={refreshFlag} />
    </div>
  );
}

export default App;
