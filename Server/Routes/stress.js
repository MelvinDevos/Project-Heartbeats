const express = require("express");
const pool = require("../Modules/db");
const speakers = require("../Modules/speaker");
const verify = require("../modules/verifyToken");
const joi = require("joi");
const ChromecastAPI = require("chromecast-api");
const client = new ChromecastAPI();

const router = express.Router();

router.post("/meting/:id", async (req, res) => {
  console.log("er is stressmeting voor patient", req.params.id);
  try {
    const connection = pool.query(
      `SELECT box_id, hr_tresh FROM patient WHERE id = ${req.params.id}`,
      (error, result) => {
        if (error) return res.status(400).send({ message: error.sqlMessage });

        console.log(result[0].box_id);
        var result = speakers.devices.filter((obj) => {
          return obj.friendlyName === result[0].box_id;
        });

        var mediaURL = "http://flandersrp.be/melvis.mp3";
        client.devices[0].play(mediaURL, function (err) {
          if (!err) console.log("Playing in your chromecast");
        });

        return res.status(200).send({ message: "success" });
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

// The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

module.exports = router;
