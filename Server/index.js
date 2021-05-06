const express = require("express");
const dotenv = require("dotenv").config();
const cors = require('cors')
const pool = require("./Modules/db");
const speakers = require("./Modules/speaker");
const app = express();

app.use(cors()) //CORS error
app.use(express.json()); //Used to parse JSON bodies

// Routes
const auth = require("./Routes/auth");
app.use("/auth", auth);

const patient = require("./Routes/patient");
app.use("/patient", patient);

const music = require("./Routes/music");
app.use("/music", music);

const playlist = require("./Routes/playlist");
app.use("/playlist", playlist);

const stress = require("./Routes/stress");
app.use("/stress", stress);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Heartbeats server listening on port: ${port}`);
});
