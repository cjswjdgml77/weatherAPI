const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const app = express();
const port = 3001;
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(express.json());

app.get("/weather", cors(corsOptions), async (req, res) => {
  const lat = req.query.lat;
  const long = req.query.long;

  try {
    const data = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_KEY}&q=${lat},${long}`
    );
    res.send(data.data);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});
app.listen(port, () => {
  console.log("listening on port " + port);
});
