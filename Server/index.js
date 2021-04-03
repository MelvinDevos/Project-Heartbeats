const express = require("express");
const app = express();

app.use(express.json()); //Used to parse JSON bodies

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Heartbeats server luistert op poort ${port}`);
});
