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
const passport = require('passport')
const local = require('passport-local')
const Emitter = require('events')

// Middleware to parse JSON bodies with out this you can;t parse the json body
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));



//database connection
main().then(() => {
    console.log("connected sucessfully !");
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_CONNECTION_URL);
}

//session store

const mongoStore = new MongoDBStore({
    mongoUrl: process.env.MONGO_CONNECTION_URL,
    collection: 'sessions'
});

//emitter
const eventEmitter = new Emitter();
app.set('eventEmitter' ,eventEmitter)

//session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
}));


//passport config
const passportInit = require('./app/config/passport');
const { Socket } = require('socket.io');
passportInit(passport);
app.use(passport.initialize())
app.use(passport.session())


app.use(flash())

//global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
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
app.use((req,res)=>{
    res.status(404).render('errors/404')
})




const server = app.listen(PORT, () => {
    console.log("listining at port", PORT);
})

//socket 

const io = require('socket.io')(server)

io.on('connection',(socket)=>{

    socket.on('join',(orderId)=>{
        socket.join(orderId);
    })
})

eventEmitter.on('orderUpdated',(data)=>{
    io.to(`order_${data.id}`).emit('orderUpdated' , data)
})

eventEmitter.on('orderPlaced',(data)=>{
    io.to('adminRoom').emit('orderPlaced',data)
})