require('dotenv').config()
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const PORT = process.env.PORT || 7777;
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDBStore = require('connect-mongo');

// Middleware to parse JSON bodies with out this you can;t parse the json body
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));



//database connection
main().then(()=>{
    console.log("connected sucessfully !");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/pizza');
}

//session store

const mongoStore = new MongoDBStore({
    mongoUrl: 'mongodb://127.0.0.1:27017/pizza',
    collection: 'sessions'
});

//session config
app.use(session({
    secret : process.env.COOKIE_SECRET,
    resave : false,
    saveUninitialized :false,
    store : mongoStore,
    cookie : {maxAge :1000 * 60 * 60 * 24},
}));

app.use(flash())

//global middleware
app.use((req,res,next)=>{
    res.locals.session = req.session
    next()
})

//assets
app.use(express.static('public'));

//set template engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/resources/views'));

//Routers
require('./routes/web')(app)

app.listen(PORT,()=>{
    console.log("listining at port",PORT);
})