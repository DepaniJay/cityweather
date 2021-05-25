const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
// at hosting time server check first 8000 port if this is not work then server go to process.env.PORT it's return port, server use this port 
const port = process.env.PORT || 8000;

// absolute paths
const publicFolderPath = path.join(__dirname,"../public"); 
const template_path = path.join(__dirname,"../templates/views");
const parials_path = path.join(__dirname,"../templates/partials");

app.set('view engine','hbs');
app.set('views',template_path);
hbs.registerPartials(parials_path);

app.use(express.static(publicFolderPath));

let d = new Date();
let currentYear = d.getFullYear();

// routing
app.get('/',(req,res)=>{
    res.render('index',{currentYear});
});

app.get('/about',(req,res)=>{
    res.render('about',{currentYear});
});

app.get('/weather',(req,res)=>{
    res.render('weather',{currentYear});
});

app.get('*',(req,res)=>{
    res.render('404',{
        errorMsg :"Sorry, Page Not Found.",
        currentYear
    });
});

app.listen(port,()=>{
    console.log(`listening to the port ${port}`);
});
