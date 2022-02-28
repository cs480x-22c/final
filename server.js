const express = require("express");
var cors = require("cors");
const app = express();

var corsOptions = {
  origin: "https://alexiscaira.github.io/final/",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get("/", cors(corsOptions), function (req, res, next) {
  response.sendFile(__dirname + "/index.html");
  res.json({ msg: "This is CORS-enabled req" });
});

const listener = app.listen(process.env.PORT, () => {
  console.log("listening on port " + listener.address().port);
});
