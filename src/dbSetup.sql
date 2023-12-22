CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    family_name VARCHAR(50),
    email VARCHAR(50),
    phone_number VARCHAR(20),
    address VARCHAR(50),
    password VARCHAR(50),
    preferred_doctors VARCHAR(50),
    waiting_list_position INT DEFAULT 0
);

SELECT * FROM users;

CREATE TABLE IF NOT EXISTS appointments (
    appointment_id SERIAL PRIMARY KEY,
    user_id INT,
    appointment_type VARCHAR(50),
    practitioner VARCHAR(50),
    time TIME,
    date DATE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) references users(user_id)
);

SELECT * FROM appointments;