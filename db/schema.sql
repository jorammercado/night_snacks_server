DROP DATABASE IF EXISTS snacks_dev;
CREATE DATABASE snacks_dev;

\c snacks_dev;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE snacks (
    resource_id SERIAL PRIMARY KEY,
    user_id INT,
    name TEXT NOT NULL,
    image TEXT NOT NULL DEFAULT 'https://commons.wikimedia.org/wiki/Main_Page',
    category TEXT NOT NULL DEFAULT 'category of snack',
    calories INT DEFAULT 0,
    rating DECIMAL DEFAULT 0,
    is_favorite BOOLEAN DEFAULT false,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) );
