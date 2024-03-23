CREATE TABLE IF NOT EXISTS locations (
    location_id SERIAL PRIMARY KEY,
    location_name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    family_name VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    phone_number VARCHAR(20),
    address VARCHAR(50),
    password VARCHAR(120),
    preferred_doctors VARCHAR(50),
    waiting_list_position INT DEFAULT 0,
    admin BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS doctors (
    doctor_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    location_id INT,
    start_time TIME,
    end_time TIME,
    break_time TIME,
    CONSTRAINT fk_location_id FOREIGN KEY (location_id) REFERENCES locations(location_id)
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