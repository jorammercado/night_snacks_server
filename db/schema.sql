\c snacks_dev;

CREATE TABLE users (
   user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    emaiil VARCHAR(100) NOT NULL,
    pasword_hash VARCHAR(255) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMES);

