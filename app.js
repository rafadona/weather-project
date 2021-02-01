const express = require('express');
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function (req, res) {

    const appKey = "4a2e718d26f8f4c9fc1436d71059b078"
    const cidade = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cidade + "&appid=" + appKey + "&units=metric"

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {

            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const city = weatherData.name
            const icon = weatherData.weather[0].icon
            const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write(`<h1>The temperature in ${city} is ${temp} celsius</h1>`);
            res.write(`<p>the weather is currently ${weatherDescription}</p>`);
            res.write("<img src=" + iconUrl + ">");


        });

    });


});


app.listen(3300, function () {

});