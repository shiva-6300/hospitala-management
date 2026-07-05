package com.example.hospital.service;

import com.example.hospital.entity.Patient;
import com.example.hospital.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// This class contains the "business logic".
// For this simple project, it just passes requests through to the repository.
@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    // Return all patients from the database
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Save a new patient to the database
    public Patient addPatient(Patient patient) {
        return patientRepository.save(patient);
    }
}
