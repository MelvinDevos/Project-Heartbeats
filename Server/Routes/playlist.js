const express = require("express");
const pool = require("../Modules/db");
const verify = require("../modules/verifyToken");
const joi = require("joi");
const ChromecastAPI = require("chromecast-api");
const client = new ChromecastAPI();

const router = express.Router();

//Validatie schema maken voor create
const playlistAdd = joi.object({
  patient_id: joi.string().required(),
  song_id: joi.string().required(),
});

router.post("/song/add", verify, async (req, res) => {
  try {
    const value = await playlistAdd.validateAsync(req.body);

    let playlist = {
      patient_id: pool.escape(value.patient_id),
      song_id: pool.escape(value.song_id),
    };

    const connection = pool.query(
      `INSERT INTO playlist_songs (name, yt_link, duration) VALUES (${playlist.patient_id}, ${playlist.song_id})`,
      (error, result) => {
        if (error) return res.status(400).send({ message: error.sqlMessage });
        res.status(200).json({
          message: "Playlist added",
          song: { id: result.insertId, ...value },
        });
      }
    );
  } catch (error) {
    console.log("schema error");
    return res.status(400).send({ message: error.details[0].message });
  }
});

router.delete("/playlist/delete/:id", verify, (req, res) => {
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

router.get("/playlist/show/:id?", verify, (req, res) => {
  const ID = req.params.id;
  let sql = "SELECT * FROM songs";
  if (ID) sql = `SELECT * FROM songs WHERE id = ${ID}`;

  const connection = pool.query(sql, (error, result) => {
    if (error) return res.status(400).send({ message: error.sqlMessage });
    res.status(200).json(result);
  });
});

module.exports = router;
