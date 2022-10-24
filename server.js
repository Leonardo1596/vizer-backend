require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const cors = require('cors');

const cookieParser = require('cookie-parser');
const session = require('express-session');







const routeHome = require('./routes/home');
const routeAuth = require('./routes/auth');
const routeLogout = require('./routes/logout');
const routeUpdatePassword = require('./routes/updatePassword');


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


app.use(session({
    secret: process.env.SESSION_KEY,
    saveUninitialized: false,
    resave: false
}));


// Middlewares


// Routes
app.use(routeHome);
app.use(routeAuth);
app.use(routeLogout);
app.use(routeUpdatePassword);


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.emit('ready');
        console.log('Connected to MongoDB');
    })
    .catch((error) => console.log(error));


// Server
app.on('ready', () => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
        console.log(`http://localhost:${port}`);
    });
})