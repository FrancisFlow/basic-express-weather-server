const express = require('express')
const { json } = require('express/lib/response')
const https= require('https')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {

res.sendFile(__dirname + '/index.html')

    



    
})
app.post('/', (req, res) => {
    apiKey="c70a03a8f101da2f8e0ae56406c06a03"
    query=req.body.cityName

    const url=`https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=${query}`




    https.get(url, (response) => {
        console.log('Status code :' + response.statusCode);

        response.on('data', (data) => {
            const weather= JSON.parse(data)
            const temp= weather.main.temp
            console.log(temp)
            const weather_description= weather.weather[0].description
            console.log(weather_description)
            const icon = weather.weather[0].icon
            icon_url=`http://openweathermap.org/img/wn/${icon}@2x.png`
            console.log(icon)
        
        
            
            res.write(`<h1> The temperature in ${query} is ${temp} degrees Celsius. </h1> <h2>The weather description for ${query} is ${weather_description}</h2>`);
            res.write(`<img src=${icon_url} >`);
            res.send();
        })
    });

})


app.listen(3000, ()=>{
    console.log('App is listening on port 3000')
})