const ChromecastAPI = require("chromecast-api");
const client = new ChromecastAPI();

client.on("device", function (device) {
  console.log("Speaker gevonden: ",device.friendlyName);

  //   var mediaURL = "http://flandersrp.be/melvis.mp3";
  device.on('finished',function () {
    console.log('ik stop')
    //device.stop()
    device.close()
    console.log('en mijn naam is')
    console.log(device.friendlyName)
  })
  // device.play(mediaURL, function (err) {
  //   if (!err) console.log("Playing in your chromecast");
  // });
});

module.exports = client;
