const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes');
const cocktailRouter = require('./routes/cocktailRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();

// app.use(cors());
app.use(
    cors({
        credentials: true,
        origin: [
            'http://localhost:3000',
        ],
    }),
);
mongoose.connect(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => {
        console.log('listening');
        app.listen(5000)
    })
    .catch((err) => console.log(err));


//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


// ROUTER MIDDLEWARE
app.use('/api/cocktails', cocktailRouter);
app.use('/auth', authRouter);

// app.use((req, res, next) => {
//     // If no previous routes match the request, send back the React app.
//     res.sendFile(__dirname + "/public/index.html");
// });