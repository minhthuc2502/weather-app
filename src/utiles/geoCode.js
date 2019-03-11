request = require("request");
const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address +".json?access_token=pk.eyJ1IjoibWluaHRodWMiLCJhIjoiY2pzczF2eHkzMWFseDQ1bzZkNW5lYmdrbCJ9.jaDp0qlwuvxq7VV2F79O3Q&limit=1";
    request({url, json : true},(error,{body}) => {
        if (error){
            callback("the connection to the sever is failed!",undefined);
        }
        else if(body.features.length === 0){
            callback("Not found the location, please try another location!",undefined);
        }else{
            callback(undefined,{latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location: body.features[0].place_name});
        }
    })
}

module.exports = geoCode;