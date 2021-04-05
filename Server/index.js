const express = require("express");
const dotenv = require("dotenv").config();

const pool = require("./Modules/db");
const app = express();

app.use(express.json()); //Used to parse JSON bodies

// Routes
const auth = require("./Routes/auth");
app.use("/auth", auth);

app.get("/", (req, res) => {
  pool.query("SHOW TABLES", (error, results) => {
    if (error) return res.send(error.sqlMessage);

    res.send(results);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Heartbeats server listening on port: ${port}`);
});
