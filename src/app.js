const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geoCode = require("./utiles/geoCode")
const forecast = require("./utiles/forecast")

//tao 1 application, nhu tao 1 server page ten la app
const app = express();
const port = process.env.PORT || 3000; //neu chi su dung cong 3000 thi chi co may minh co the chay duoc server
                               //chung ta muon server co the chay o mot moi truong khac chang han nhu heroku
                               //heroku se tra ve cong cua ho va server co the chay tren moi truong heroku thong qua cong do

const publicDirectoryPath = path.join(__dirname,"../public");
const ViewPath = path.join(__dirname,"../templates/views");
const partialPath = path.join(__dirname,"../templates/partials");

app.set("view engine","hbs");      
app.set("views",ViewPath);
hbs.registerPartials(partialPath);  //Partial dung de tao nhung header va footer dung toi dung lui o cac trang web
                                    //regisPartials dan duong link cho cac file hbs vi tri cua partial
app.use(express.static(publicDirectoryPath));
//req: nhan vao reqest cua browser, res la nhung gi server tra ve 
app.get("",(req,res)=> {
    res.render("index",{
        title: "Weather app",
        name: "PHAM Minh Thuc"
    })
})

//the route help
// app.get("/help",(req,res) => {
//     res.send([{
//         name: "THUC",
//         age: 22
//     },{
//         name:"Lem",
//         age:21
//     }]);
// })
//hbs giup co the render 1 dynamic page vao trong nodejs, them duoc cac value vao trong webpage
//tao code co the reuse 
app.get("/help",(req,res) => {
    res.render("help",{
        title: "HELP PAGE",
        helpContent: "This is a help for this app",
        name : "PHAM Minh Thuc"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title: "About",
        name : "PHAM Minh Thuc"
    });
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide address to forecast"
        });
    }
    geoCode(req.query.address,(error,{latitude,longitude,location}= {}) =>{
        if(error){
            return res.send({error});
        }
        forecast(latitude,longitude,(error,forecastData) => {
            if(error){
                return res.send({error});
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            });
        })
    }
    )

})
app.get("/help/*",(req,res) => {
    res.render("404",{
        title: "404",
        name:"PHAM Minh Thuc",
        errorMessage:"Help article not found."
    })
})
app.get("*",(req,res)=>{
    res.render("404",{
        title:"404",
        name:"PHAM Minh Thuc",
        errorMessage:"Page not found."
    })
})

app.listen(port,() => {
    console.log("The server is running on port" + port);
})