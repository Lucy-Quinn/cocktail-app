const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes');
const cocktailRouter = require('./routes/cocktailRoutes');
require('dotenv').config();

const app = express();

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => {
        console.log('listening');
        app.listen(3000)
    })
    .catch((err) => console.log(err));

// ROUTER MIDDLEWARE
app.use('/api/cocktails', cocktailRouter);
app.use('/auth', authRouter);