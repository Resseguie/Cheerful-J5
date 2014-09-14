var request = require("request")
  , five = require("johnny-five")
  , Spark = require("spark-io")
  , board = new five.Board({
      io: new Spark({
        token: process.env.SPARK_TOKEN
      , deviceId: process.env.SPARK_DEVICE_ID
      })
    });


board.on("ready", function() {
  console.log("Connected");

  // Initialize the RGB LED
  var led = new five.Led.RGB({
    pins: {
      red: "A5"
    , green: "A6"
    , blue: "A7"
    }
  });

  this.repl.inject({
    led: led
  }); 

  // RGB LED alternate constructor
  // This will normalize an array of pins in [r, g, b]
  // order to an object (like above) that is shaped like:
  // {
  //   red: r,
  //   green: g,
  //   blue: b
  // }
  //var led = new five.Led.RGB([3,5,6]);

  var colorMap = {
    "red"       : "#ff0000"
  , "green"     : "#00ff00"
  , "blue"      : "#0000ff"
  , "cyan"      : "#00ffff"
  , "white"     : "#ffffff"
  , "warmwhite" : "#fdf5e6"
  , "oldlace"   : "#fdf5e6" // same as warm white
  , "purple"    : "#a020f0"
  , "magenta"   : "#ff00ff"
  , "pink"      : "#ff00ff"
  , "yellow"    : "#ffff00"
  , "orange"    : "#ff8c00"
  };

  // Turn it on and set the initial color
  //led.on();
  //led.color(colorMap["white"]);
  //led.pulse(1000);

  var lastColor = "white";
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