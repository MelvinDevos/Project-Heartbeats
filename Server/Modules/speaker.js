const ChromecastAPI = require("chromecast-api");
const client = new ChromecastAPI();

client.on("device", function (device) {
  console.log("Speaker gevonden: ",device.friendlyName);
  // var mediaURL = "http://flandersrp.be/english.mp3";
  // device.play(mediaURL, function (err) {
  //   if (!err){
  //     console.log("Playing in your chromecast")
  //   }
  // }); 
});




module.exports = client;
