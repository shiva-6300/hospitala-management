-- Create the database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS hospital_db;
USE hospital_db;

-- Create the patients table
CREATE TABLE IF NOT EXISTS patients (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(20) NOT NULL
);

-- Insert 2 sample patients
INSERT INTO patients (name, age, gender) VALUES ('John Doe', 35, 'Male');
INSERT INTO patients (name, age, gender) VALUES ('Jane Smith', 28, 'Female');
