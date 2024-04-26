const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const PORT = process.env.PORT || 7777;


app.get("/",(req,res)=>{
    res.render("home")
})

//set template engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/resources/views'));



app.listen(PORT,()=>{
    console.log("listining at port",PORT);
})