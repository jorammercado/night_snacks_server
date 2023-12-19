\c snacks_dev;

INSERT INTO users(username, email, password_hash, registration_date )
VALUES
('admin', 'admin@example.com', 'hashed_password1', '12/19/2023'),
('user2', 'user2@example.com', 'hashed_password2', '12/19/2023'),
('user3', 'user2@example.com', 'hashed_password3', '12/19/2023');

INSERT INTO snacks (name, image, category, calories, rating, is_favorite, user_id) 
VALUES
('Brownies','https://upload.wikimedia.org/wikipedia/commons/8/8e/Several_brownies.jpg', 'Pastry' , 270, 8.7, false, 1 ),
('Cheese - Brie','https://upload.wikimedia.org/wikipedia/commons/a/a7/Brie_de_Meaux.jpg', 'Dairy' , 80, 5, true, 1 ),
('Pretzels','https://upload.wikimedia.org/wikipedia/commons/e/e7/Bretzel_03.JPG', 'Bread' , 110, 2.7, true, 1 ),
('Saltine Crackers','https://upload.wikimedia.org/wikipedia/commons/2/20/Two_Club_Crackers%2C_Jan_2020.jpg', 'Crackers' , 130, 1.3, false, 1 ),
('Popcorn','https://upload.wikimedia.org/wikipedia/commons/5/55/Popcorn_%28Alabama_Extension%29.jpg', 'Grain' , 170, 4.2, false, 1 ),
('Potato Chips','https://upload.wikimedia.org/wikipedia/commons/6/69/Potato-Chips.jpg', 'Chips' , 140, 7.1, false, 1 ),
('Beef Jerky','https://upload.wikimedia.org/wikipedia/commons/1/1f/Beef-jerky.jpg', 'Meat' , 50, 8.7, false, 1 ),
('Snickers','https://upload.wikimedia.org/wikipedia/commons/2/27/2019-01-28_19_55_14_A_Snickers_bar_with_the_wrapper_still_intact_in_the_Dulles_section_of_Sterling%2C_Loudoun_County%2C_Virginia.jpg', 'Candy Bar' , 250, 9.2, false, 1 ),
('Kit Kat','https://upload.wikimedia.org/wikipedia/commons/2/27/2019-01-28_19_55_14_A_Snickers_bar_with_the_wrapper_still_intact_in_the_Dulles_section_of_Sterling%2C_Loudoun_County%2C_Virginia.jpg', 'Candy Bar' , 220, 8.7, false, 1 ),
('Flan','https://upload.wikimedia.org/wikipedia/commons/7/74/Flan_Potes_2.jpg', 'Dessert' , 320, 2.1, true, 1 ),
('Cheese Cake','https://upload.wikimedia.org/wikipedia/commons/0/0a/New_York_cheese_cake_in_coffee_house.jpg', 'Cake' , 210, 8.2, false, 1 ),
('Tiramisu','https://upload.wikimedia.org/wikipedia/commons/e/e7/Classic_Italian_Tiramisu-3_%2829989504485%29.jpg', 'Pastry' , 375, 3.3, false, 1 ),
('Slim Jim','https://upload.wikimedia.org/wikipedia/commons/c/c3/Slim_Jim.jpg', 'Meat' , 150, 8.4, true, 1 ),
('Croissant','https://upload.wikimedia.org/wikipedia/commons/3/3b/Croissant%2C_whole.jpg', 'Pastry' , 360, 9.1, true, 1 ),
('Soft Serve','https://upload.wikimedia.org/wikipedia/commons/1/16/Soft_Serve_7-11.jpg', 'Ice Cream' , 103, 9.2, false, 1 ),
('Bagel','https://upload.wikimedia.org/wikipedia/commons/1/1d/Bagel-Plain-Alt.jpg', 'Bread' , 270, 7.2, false, 1 );


