const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const dbURI = 'mongodb+srv://lucy:3Azi0rkQ2uax51MZ@cocktails.tzba3.mongodb.net/cocktail-app';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => {
        console.log('listening');
        app.listen(3000)
    })
    .catch((err) => console.log(err));

// ROUTER MIDDLEWARE
app.get('/cocktails');
app.use('/auth', authRouter);