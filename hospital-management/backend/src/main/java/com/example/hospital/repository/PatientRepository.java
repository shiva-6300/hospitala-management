package com.example.hospital.repository;

import com.example.hospital.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// JpaRepository already provides basic database operations like
// save(), findAll(), findById(), deleteById(), etc.
// We don't need to write any SQL ourselves for this simple project.
@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
}
