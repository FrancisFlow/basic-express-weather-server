const express = require('express')
const { json } = require('express/lib/response')
const https= require('https')

const app = express()

app.get('/', (req, res) => {

   const url='https://api.openweathermap.org/data/2.5/weather?appid=c70a03a8f101da2f8e0ae56406c06a03&units=metric&q=Nairobi'

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
        
        
            
            res.write(`<h1> The temperature in Nairobi is ${temp} degrees Celsius. </h1> <h2>The weather in Nairobi is ${weather_description}</h2>`);
            res.write(`<img src=${icon_url} >`);
            res.send();
        })
    });



    
})



app.listen(3000, ()=>{
    console.log('App is listening on port 3000')
})