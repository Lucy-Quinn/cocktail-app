const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes');
const cocktailRouter = require('./routes/cocktailRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();

mongoose.connect(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => {
        console.log('listening');
        app.listen(5000)
    })
    .catch((err) => console.log(err));


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

// ROUTER MIDDLEWARE
app.use('/api/cocktails', cocktailRouter);
app.use('/auth', authRouter);