request = require("request");
forecast =(latitude,longitude,callback) => {
    const url = "https://api.darksky.net/forecast/81c02d0ad4abd83fe53960307815eb74/"+latitude+ ","+ longitude+"?lang=en";
    request({ url , json : true},(error,{body}) => {
        if(error){
            callback("the connection to the forecast server failed!",undefined);
        }else if(body.error){
            callback(body.error,undefined);
        }else{
            callback(undefined,body.daily.data[0].summary +"it is currently "+body.currently.temperature+ " degree out. There is a "+ body.currently.precipProbability+"% chance of rain.\nThe temperature high is " + body.daily.data[0].temperatureHigh +" and the temperature low is "+body.daily.data[0].temperatureLow+"\nThe humidity is about "+body.currently.humidity)
        }
    })
}

module.exports= forecast;