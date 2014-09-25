## Cheerful J5

`cheerful.js`

Queries the [@Cheerlights](http://www.cheerlights.com/) Thingspeak channel and updates the RGB LED using Johnny-Five.

`cheerful-twit.js`

Listens to the Twitter stream for commands sent to @Cheerlights or #cheerlights and updates the RGB LED using Johnny-Five.


If SPARK_DEVICE_ID and SPARK_TOKEN environment variables are set, it assumes you want to communicate with a Spark Core. Otherwise it looks for standard Arduino plugged in via USB.

Defaults to pins [3, 5, 6] for Arduino and ["A5", "A6", "A7"] for Spark.


Change the color by tweeting to @cheerlights and mentioning a color.


Assumes wiring as in the [Johnny-Five RGB LED example](https://github.com/rwaldron/johnny-five/blob/master/docs/led-rgb.md).
