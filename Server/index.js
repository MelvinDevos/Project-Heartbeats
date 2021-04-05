const express = require("express");
const dotenv = require("dotenv").config();

const pool = require("./Modules/db");
const app = express();

app.use(express.json()); //Used to parse JSON bodies

// Routes
const auth = require("./Routes/auth");
app.use("/auth", auth);

const patient = require("./Routes/patient");
app.use("/patient", patient);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Heartbeats server listening on port: ${port}`);
});
