const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;

const {
  getOneUser,
  getOneUserByEmail,
  createUser,
} = require("../queries/users.js");

const{
  checkName,
  checkBoolean
} = require("../validations/checkUser.js")

const PRIVATE_KEY = process.env.PRIVATE_KEYr;

const users = express.Router();

// Configure the BearerStrategy
passport.use(new BearerStrategy(
    async (token, done) => {
        try {
            // Decode the JWT and retrieve the user ID
            const userId = "" // decode token and get user ID;

            // Fetch the user from the database
            const user = await getOneUserById(userId);

            // Check if the user exists
            if (!user) {
                return done(null, false);
            }

            // Pass the user to the next middleware
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

// LOGIN ROUTE
users.post("/login", passport.authenticate('bearer', { session: false }), (req, res) => {
    // If authentication is successful, req.user will contain the authenticated user
    res.status(200).json({ message: 'Login successful!', user: req.user });
});

// SIGN UP ROUTE
users.post("/", checkName, checkBoolean, async (req, res) => {
  const userData = req.body;

  try {
      const newUser = await createUser(userData);
      // Exclude sensitive information from the response
      const sanitizedUser = { username: newUser.username, email: newUser.email };

      res.status(201).json({ message: 'User registered successfully!', user: sanitizedUser });
  } catch (error) {
      res.status(500).json({ error: 'Error registering user.' });
  }
});

    

module.exports = users;
