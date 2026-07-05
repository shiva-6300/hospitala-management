-- This file inserts sample patients when the application starts.
-- It only runs because spring.sql.init.mode=always is set in application.properties.

INSERT INTO patients (name, age, gender) VALUES ('John Doe', 35, 'Male');
INSERT INTO patients (name, age, gender) VALUES ('Jane Smith', 28, 'Female');
