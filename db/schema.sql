DROP DATABASE IF EXISTS snacks_dev;
CREATE DATABASE snacks_dev;

\c snacks_dev;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL DEFAULT 'first name unknown',
    lastname VARCHAR(50) NOT NULL DEFAULt 'last namer unknown',
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_img TEXT DEFAULT 'profile image',
    about TEXT DEFAULT 'about me',
    dob VARCHAR(20) DEFAULT '1/1/2024',
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
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE);
