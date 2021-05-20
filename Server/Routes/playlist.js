const express = require("express");
const pool = require("../Modules/db");
const verify = require("../Modules/verifyToken");
const joi = require("joi");
const ChromecastAPI = require("chromecast-api");
const client = new ChromecastAPI();

const router = express.Router();

router.put("/update/:id", verify, async (req, res) => {
  console.log("er is update voor patient", req.params.id);
  try {
    console.log(req.body);

    let stringSQL = "";

    req.body.forEach((element) => {
      stringSQL += `(${req.params.id},${element.id}),`;
    });

    stringSQL = stringSQL.slice(0, -1);

    console.log(stringSQL);

    const connection = pool.query(
      `DELETE FROM playlist_songs WHERE patient_id = '${req.params.id}'  `,
      (error, result) => {
        if (error) {
          console.log(error.sqlMessage);
          return res.status(400).send({ message: error.sqlMessage });
        }

        const connection = pool.query(
          `INSERT INTO playlist_songs (patient_id, song_id) VALUES ${stringSQL} `,
          (error, result) => {
            if (error) {
              console.log(error.sqlMessage);
              return res.status(400).send({ message: error.sqlMessage });
            }
            res.status(200).json({
              message: "Playlist updated",
            });
          }
        );
      }
    );
  } catch (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
});

router.get("/show/:id", verify, (req, res) => {
  const ID = req.params.id;
  console.log("Playlist vragen met ID: ", ID);
  let sql = `SELECT song_id FROM playlist_songs WHERE patient_id = ${ID}`;

  const connection = pool.query(sql, (error, result) => {
    console.log("resultaat");
    console.log(JSON.stringify(result));
    const newResult = result.map((song) => {
      let newSong = {
        id: song.song_id,
      };
      console.log(newSong);
      return newSong;
    });

    console.log(newResult);
    if (error) return res.status(400).send({ message: error.sqlMessage });
    res.status(200).json(newResult);
  });
});

module.exports = router;
