const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const metricSystem = "metric";
  const apiKey = "1fa43a200f45c4c89dbd6bf0aa495955";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + metricSystem + "&appid=" + apiKey;
  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The temperature in " + query + " is: " + temperature + " </h1>");
      res.write("<h3>Weather description: " + weatherDescription + "</h3>");
      res.write("<img src =" + imageURL + ">");
      res.send();
    });
  });

});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
