const express = require("express");
const pool = require("../Modules/db");
const verify = require("../Modules/verifyToken");
const joi = require("joi");
const speakers = require("../Modules/speaker");


const router = express.Router();

//Validatie schema maken voor create
const songAdd = joi.object({
  name: joi.string().required(),
  yt_link: joi.string().required(),
});

//Routes
router.get("/", (req, res) => {
  res.send("Hello from Heartbeats music API");
});

//Routes
router.get("/device/show", (req, res) => {
  const friendlyNames = speakers.devices.map(device => device.friendlyName)
  console.log(friendlyNames)
  res.status(200).send(JSON.stringify(friendlyNames))
});

router.post("/song/add", verify, async (req, res) => {
  try {
    const value = await songAdd.validateAsync(req.body);

    let song = {
      name: pool.escape(value.name),
      yt_link: pool.escape(value.yt_link),
    };

    const connection = pool.query(
      `INSERT INTO songs (name, yt_link) VALUES (${song.name}, ${song.yt_link})`,
      (error, result) => {
        if (error) return res.status(400).send({ message: error.sqlMessage });
        res.status(200).json({
          message: "Song added",
          song: { id: result.insertId, ...value },
        });
      }
    );
  } catch (error) {
    console.log("schema error");
    return res.status(400).send({ message: error.details[0].message });
  }
});

router.delete("/song/delete/:id", verify, (req, res) => {
  const id = req.params.id;
  console.log(id);
  const connection = pool.query(
    `DELETE FROM songs WHERE id=${id}`,
    (error, result) => {
      if (error) return res.status(400).send({ message: error.sqlMessage });
      res.status(200).json({ message: "Song deleted" });
    }
  );
});

router.get("/song/show/:id?", verify, (req, res) => {
  const ID = req.params.id;
  let sql = "SELECT * FROM songs";
  if (ID) sql = `SELECT * FROM songs WHERE id = ${ID}`;

  const connection = pool.query(sql, (error, result) => {
    if (error) return res.status(400).send({ message: error.sqlMessage });
    res.status(200).json(result);
  });
});

module.exports = router;
