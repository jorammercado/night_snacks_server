\c snacks_dev;

CREATE TABLE users (
   user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    emaiil VARCHAR(100) NOT NULL,
    pasword_hash VARCHAR(255) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMES);

CREATE TABLE snacks (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL.
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    calories INT,
    rating INT );
