const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes');
require('dotenv').config();
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

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
app.get('*', checkUser); //* applies it to every single get request
app.get('/cocktails', requireAuth);
app.use('/auth', authRouter);