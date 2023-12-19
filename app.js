const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Night Snacks")
})

app.get("*", (req, res) => {
    res.status(404).send("Page not found")
})

module.exports = app;
