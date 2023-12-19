\c snacks_dev;

INSERT INTO users(username, email,pasword_hash, registration_date )
VALUES
('user1', 'user1@example.com', 'hashed_password1', 'registered_date'),
('user2', 'user1@example.com', 'hashed_password2', 'registered_date'),
('user3', 'user1@example.com', 'hashed_password3', 'registered_date');

INSERT INTO snacks (name, image, category, calories, rating) 
VALUES
('brownies,'brownies', pastries,140,8.7 )