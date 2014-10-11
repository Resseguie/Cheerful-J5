var twit = require("node-tweet-stream");

t = new twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  token: process.env.TWITTER_TOKEN,
  token_secret: process.env.TWITTER_TOKEN_SECRET
});

t.track(process.argv[2]);

t.on("tweet", function (tweet) {
  console.log(tweet.text);
});

t.on("error", function (err) {
  console.log("Error with Twitter stream: %o", err);
});
