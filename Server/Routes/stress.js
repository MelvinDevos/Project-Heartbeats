const express = require("express");
const pool = require("../Modules/db");
const speakers = require("../Modules/speaker");
const verify = require("../Modules/verifyToken");
const joi = require("joi");
const ChromecastAPI = require("chromecast-api");
const client = new ChromecastAPI();
const router = express.Router();
let currentlyPlaying=[]

// var mediaURL = "http://flandersrp.be/melvis.mp3";
// try{
//   patientSpeaker[0].play(mediaURL, function (err) {
//     if (!err) console.log("Playing in your chromecast");
//   });
// }
// catch(err){
//   console.log(err)
// }

class music {
  constructor(id = "empty", naam) {
    try {
      this.Id = id;
      this.naam = naam;
    } catch (error) {
      console.log(`${error}`);
    }
  }
}

class Player {
  constructor(patient_id, box_id, song_array) {
    try {
      this.patient_id = patient_id;
      this.box_id = box_id;
      this.song_array = song_array;
      this.index = 0;

    } catch (error) {
      console.log(`${error}`);
    }
  }
  async start(){
    let that = this
    this.box_id.on('status' ,function(status) {
      // console.log(status)
      if(status.playerState == 'PAUSED'){that.stopMusic()}
    })
    this.box_id.on('finished',function () {
      console.log('on device')
      console.log(that.box_id.friendlyName)
      that.index++;
      that.playMusic()
    })
  }
  async playMusic(){
    // let timer
    // clearTimeout(this.timer);
    console.log('index is ' + this.index)
    console.log('this is the song')
    console.log(this.song_array[this.index])
    console.log("Hoelang?" + this.song_array.length)
    // console.log("patientspeaker is")
    // console.log(this.box_id)+
    if(this.index == 0){
      this.start()
    }
    if(this.index > this.song_array.length - 1){
      this.stopMusic()
    }
    else{
      var mediaURL = "http://"+process.env.YAS_IP + ":"+process.env.YAS_PORT + "/" + this.song_array[this.index].yt_link;
      console.log("current url")
      console.log(mediaURL)
      try{

        let that = this
        this.box_id.play(mediaURL, function (err) {
          if (!err){
            console.log("Playing in your chromecast")
          }
        });        
      }
      catch(err){
        currentlyPlaying = currentlyPlaying.filter((obj) => {
          return obj.patient_id !== this.patient_id;
        });
        if(err.message = "Cannot read property 'play' of undefined"){
          console.log("box niet gevonden")
        }
        else{
          console.log(err)
        }
      }
    }
  }
  stopMusic(){
    console.log("ik ben stop music")
    console.log("dit gaat om patient")
    console.log(this.patient_id)
    currentlyPlaying = currentlyPlaying.filter((obj) => {
      return obj.patient_id !== this.patient_id;
    });
    console.log(currentlyPlaying)
  }
}
client.update()
router.post("/meting/:id", async (req, res) => {
  
  console.log("er is stressmeting voor patient", req.params.id);
  try {
    let isIDPlaying = false
    currentlyPlaying.forEach(function (player) {
     if(player.patient_id == req.params.id){
       isIDPlaying = true
     }
    }); 
    if(isIDPlaying){
      return res.status(202).send({ message: "Already playing"})
    }    
    let patient_info = await getPatientInfo(req.params.id)
    console.log(req.body.heartrate)
    console.log(patient_info)
    console.log(req.body.heartrate > patient_info.hr_tresh)
    
    if(req.body.heartrate > patient_info.hr_tresh)
    {
      let patientSpeaker = await checkSpeakerId(patient_info.box_id);
      let songArray =[]
      if(patient_info.custom == 0){
       songArray = await getDefaultPlaylist(patient_info)
      }
      else{
        songArray = await getPlaylist(req.params.id)
      }
      
      console.log("lengte")
      console.log(songArray.length)
      let patient = new Player(req.params.id, patientSpeaker,shuffle(songArray))

      currentlyPlaying.push(patient);

      patient.playMusic()

      return res.status(200).send({ message: "Playlist started" });
    }
    
    return res.status(202).send({ message: "Below treshold" });
    
  } catch (error) {
    console.log(error)
    return res.status(400).send({ message: 'error?' });
  }
});

async function getPatientInfo(ID) {
  return new Promise(resolve => {
    const connection = pool.query(
      `SELECT box_id, hr_tresh, age, custom FROM patient WHERE id = ${ID}`,
      (error, result) => {
        if (error) return console.log(error);
        // console.log(result)
        resolve({patient_id: ID,box_id: result[0].box_id,hr_tresh: result[0].hr_tresh, age: result[0].age, custom :result[0].custom})      
      }
    );
  });
}

async function checkSpeakerId(name) {
  return new Promise(resolve => {
    var patientSpeaker = speakers.devices.filter((obj) => {
      return obj.friendlyName === name;
    });
    resolve(patientSpeaker[0])
  });
}

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

function getPlaylist(patientID) {
  return new Promise(resolve => {
    let songArray = []
    let sql = `SELECT name, yt_link FROM songs WHERE id in( SELECT song_id FROM playlist_songs WHERE patient_id= ${patientID})`;
    const connection = pool.query(sql, (error, result) => {
      result.forEach(function (row) {
        songArray.push({name: row.name, yt_link: row.yt_link})
      });
      // console.log("Result:")
      // console.log(result)
      // console.log("^^^^^^")
      // console.log("Songarray:")
      // console.log(songArray)
      // console.log("^^^^^^")
      resolve(songArray)
    });
  });
}

function getDefaultPlaylist(patientInfo) {
  const today = new Date();
  const year = today.getFullYear(); 
  return new Promise(resolve => {
    let songArray = []
    let sql = `SELECT name, yt_link, year FROM default_songs WHERE year BETWEEN ${year - patientInfo.age + 15} AND ${year - patientInfo.age + 25} `;
    const connection = pool.query(sql, (error, result) => {
      result.forEach(function (row) {
        songArray.push({name: row.name, yt_link: row.yt_link, year: row.year})
       
      });
      // console.log("Result:")
      // console.log(result)
      // console.log("^^^^^^")
      console.log("Songarray:")
      console.log(songArray)
      console.log("^^^^^^")
      resolve(songArray)
    });
  });
}


module.exports = router;
