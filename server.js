const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

//Starting point
app.get("/", (req, res) => {
  res.send("Welcome to the Voting project");
});

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000;

// Import the router files
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

// Use the routers
app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
