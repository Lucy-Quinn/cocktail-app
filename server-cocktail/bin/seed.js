const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

//requiring the schema
const User = require('../models/User');
const Cocktail = require('../models/Cocktail');

//requiring the mock data
const users = require('./user-mock-data');
const cocktails = require('./cocktail-mock-data');

mongoose
    .connect(process.env.DBURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then((x) => {
        //DROP THE DATABASE
        const pr = x.connection.dropDatabase();
        console.log('database dropped')
        return pr;
    })
    .then(() => {
        const updatedUser = users.map((user) => {
            const salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(user.password, salt);
            return user
        })
        // creating users with already hashed passwords
        const pr = User.create(updatedUser);
        return pr;
    })
    .then((createdUsers) => {
        console.log(`Created ${createdUsers.length} users`);
        const updatedCocktails = cocktails.map((cocktail, index) => {
            const currentUserId = createdUsers[index]._id;
            cocktail.cocktailCreator = currentUserId;
            return cocktail;
        });
        const pr = Cocktail.create(updatedCocktails);
        return pr;
    })
    .then((createdCocktails) => {
        console.log(`Created ${createdCocktails.length} cocktails`);
        const promiseArr = createdCocktails.map(cocktail => {
            const cocktailId = cocktail._id;
            const userId = cocktail.cocktailCreator;
            return User.findByIdAndUpdate(userId, { $push: { myCocktails: cocktailId } }, { new: true });
        });
        const pr = Promise.all(promiseArr);
        return pr;
    })
    .then((updatedUsers) => {
        console.log(`Updated ${updatedUsers.length} users`);
    })
    .catch((error) => console.log(error));