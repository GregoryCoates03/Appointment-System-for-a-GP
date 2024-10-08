DROP TABLE waiting_list;
DROP TABLE appointments;
DROP TABLE users;
DROP TABLE doctors;
DROP TABLE locations;

CREATE TABLE IF NOT EXISTS locations (
    location_id SERIAL PRIMARY KEY,
    location_name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS doctors (
    doctor_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    location_id INT,
    start_time TIME,
    end_time TIME,
    break_time TIME,
    monday BOOLEAN DEFAULT false,
    tuesday BOOLEAN DEFAULT false,
    wednesday BOOLEAN DEFAULT false,
    thursday BOOLEAN DEFAULT false,
    friday BOOLEAN DEFAULT false,
    saturday BOOLEAN DEFAULT false,
    sunday BOOLEAN DEFAULT false,
    CONSTRAINT fk_location_id FOREIGN KEY (location_id) REFERENCES locations(location_id)
);

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    family_name VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    phone_number VARCHAR(20),
    address VARCHAR(50),
    password VARCHAR(60),
    location_id INT,
    waiting_list_points INT DEFAULT 0,
    at_risk BOOLEAN DEFAULT false,
    admin BOOLEAN DEFAULT false,
    doctor_id INT NULL,
    CONSTRAINT fk_location_id FOREIGN KEY (location_id) REFERENCES locations(location_id),
    CONSTRAINT fk_doctor_id FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

CREATE TABLE IF NOT EXISTS appointments (
    appointment_id SERIAL PRIMARY KEY,
    user_id INT,
    location_id INT,
    doctor_id INT,
    time TIME,
    date DATE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_location_id FOREIGN KEY (location_id) REFERENCES locations(location_id),
    CONSTRAINT fk_doctor_id FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

CREATE TABLE IF NOT EXISTS waiting_list (
    waiting_list_id SERIAL PRIMARY KEY,
    user_id INT,
    location_id INT,
    doctor_id INT,
    date DATE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_location_id FOREIGN KEY (location_id) REFERENCES locations(location_id),
    CONSTRAINT fk_doctor_id FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

INSERT INTO locations (location_name) VALUES ('Location');

INSERT INTO doctors (first_name, last_name, location_id, start_time, end_time, break_time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ('Doctor', 'Doctor', 1, '10:00:00', '17:30:00', '13:00:00', true, true, false, false, true, true, true);

INSERT INTO doctors (first_name, last_name, location_id, start_time, end_time, break_time) VALUES ('Busy', 'Doctor', 1, '10:00:00', '12:00:00', '11:00:00');

INSERT INTO users (first_name, family_name, email, phone_number, address, password, location_id, admin) VALUES ('Admin', 'Admin', 'Admin@Admin', '123-456-789', 'Admin', '$2b$12$cpMFE3V.fm7mZ4dJoOMYtej7aRW3GwzZ1qmNJSIWGQlsmAc4QWrOa' /* Admin */, 1, true);

INSERT INTO users (first_name, family_name, email, phone_number, address, password, location_id, doctor_id) VALUES ('Doctor', 'Doctor', 'Doctor@Doctor', '123-456-789', 'Doctor', '$2b$12$qHNoaEErLBmH2go4jqqZPeW0OPFv/WJrA2/8Szv1sPl.C.1RkIA5y' /* Doctor */, 1, 1);

INSERT INTO users (first_name, family_name, email, phone_number, address, password, location_id) VALUES ('Patient', 'Patient', 'Patient@Patient.com', '123-456-789', 'Patient', '$2b$12$LcL2vZ62q808Lwu0lfJTqOzBf1mw2ThWA1sGXwDNS/yJi6XFjoqWS' /* Patient */, 1);

INSERT INTO users (first_name, family_name, email, phone_number, address, password, location_id, doctor_id) VALUES ('Busy', 'Doctor', 'Busy@Doctor', '123-456-789', 'Busy', '$2b$12$C1lCNa0/D74Ax2Crv9cl.uOTa75gW4AXAZAkAMJzV7AAdSRxBs81y' /* Busy */, 1, 2);

SELECT * FROM locations;

SELECT * FROM users;

SELECT * FROM doctors;

SELECT * FROM appointments;

SELECT * FROM waiting_list;