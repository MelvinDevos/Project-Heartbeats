const ChromecastAPI = require("chromecast-api");
const client = new ChromecastAPI();

client.on("device", function (device) {
  console.log("Speaker gevonden: ",device.friendlyName);
});

module.exports = client;
