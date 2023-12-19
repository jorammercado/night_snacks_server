const app = require("./app.js");

require("dotenv").connfig();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});