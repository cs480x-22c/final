const express = require("express");
const request = require("request");
var cors = require("cors");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

var data = {};
app.get("world-countries.json", (req, res) => {
  console.log(res);

  res.sendFile(path.join(__dirname, "/world-countries.json"));
});

app.get("/", (req, res) => {
  request(
    { url: "https://alexiscaira.github.io/final/" },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: err.message });
      }
      res.json(JSON.parse(body));
    }
  );
});

const listener = app.listen(process.env.PORT, () => {
  console.log("listening on port " + listener.address().port);
});
