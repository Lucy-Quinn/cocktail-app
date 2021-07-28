const Cocktail = require('../models/Cocktail');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.cocktail_get = async (req, res) => {
    try {
        const foundCocktails = await Cocktail.find().sort({ name: 1 });
        res.status(200).json(foundCocktails)
    } catch (error) {
        res.status(400).json(error)
    }
};

module.exports.cocktail_post = async (req, res) => {
    const { name, ingredients } = req.body;
    const token = req.cookies.jwt;
    const currentUserId = await jwt.verify(token, process.env.SECRET_KEY, async (error, decodedToken) => { return decodedToken.id });
    try {
        const createdCocktail = await Cocktail.create({ name, ingredients, cocktailCreator: currentUserId });
        const user = await User.findByIdAndUpdate(
            currentUserId,
            { $push: { myCocktails: createdCocktail } }, { new: true }
        )
        res.status(201).send(`Cocktail ${createdCocktail} was created successfully.`);;
    } catch (error) {
        res.status(400).json(error)
    }
};

module.exports.cocktail_get_cocktail = async (req, res) => {
    const { cocktailId } = req.params;
    try {
        const foundCocktail = await Cocktail.findById(cocktailId)
        res.status(200).json(foundCocktail)
    } catch (error) {
        res.status(400).json(error)
    }
};

module.exports.cocktail_put = async (req, res) => {
    const { cocktailId } = req.params;
    const { name, ingredients } = req.body;
    try {
        const updatedCocktail = await Cocktail.findByIdAndUpdate(cocktailId, {
            name, ingredients
        },
            { new: true }
        )
        res.status(200).json(updatedCocktail)
    } catch (error) {
        res.status(400).json(error)
    }
};

module.exports.cocktail_delete = async (req, res) => {
    const { cocktailId } = req.params;
    const token = req.cookies.jwt;
    const currentUserId = await jwt.verify(token, process.env.SECRET_KEY, async (error, decodedToken) => { return decodedToken.id });
    try {
        await User.findByIdAndUpdate(
            currentUserId,
            { $pull: { myCocktails: cocktailId } },
            { new: true }
        );
        const deletedCocktail = await Cocktail.findByIdAndDelete(cocktailId)
        res.status(200).send(`Post ${deletedCocktail} was removed successfully.`);
    } catch (error) {
        res.status(400).json(error)
    }
};
