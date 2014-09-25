var request = require("request")
  , five = require("johnny-five")
  , Spark = require("spark-io")
  , colorMap = require("./cheerlights-colors")
  , board
  , pins;

// If SPARK env vars are set, use spark-io
if (process.env.SPARK_TOKEN) {
  board = new five.Board({
    io: new Spark({
      token: process.env.SPARK_TOKEN
    , deviceId: process.env.SPARK_DEVICE_ID
    })
  });
  
  pins = ["A5", "A6", "A7"];

} else {
  board = new five.Board();
  
  pins = [3, 5, 6];
}

board.on("ready", function() {

  var lastColor = "white";
  var led = new five.Led.RGB(pins);

  led.color(colorMap[lastColor]);

  setInterval(function() {  
    getLatestColor(function(err, color) {
      if (!err && colorMap[color]) {
        if(color != lastColor) {
          lastColor = color;
          console.log("Changing to "+color);
          led.color(colorMap[color]);
        }
      }
    });
  }, 3000);

});


function getLatestColor(callback) {
  request(
    {
      url: "https://api.thingspeak.com/channels/1417/feed/last.json"
    , json: true
    }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        var color = body.field1;
        callback(null, color);
      } else {
        callback(error, null);
      }
    }
  );
}