const express = require("express");
var cors = require("cors");
const app = express();

var corsOptions = {
  origin: "https://alexiscaira.github.io/final/",
  optionsSuccessStatus: 200, 
  Access-Control-Allow-Headers: *
  Access-Control-Allow-Origin: "https://alexiscaira.github.io/final/"
};

app.get("/", cors(corsOptions), function (req, res, next) {
  response.sendFile(__dirname + "/index.html");
  res.json({ msg: "This is CORS-enabled req" });
});

const listener = app.listen(process.env.PORT, () => {
  console.log("listening on port " + listener.address().port);
});
