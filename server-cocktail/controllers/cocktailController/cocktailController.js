const Cocktail = require('../../models/Cocktail');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const axios = require('axios');
const { QUERY_DATA, url } = require('./constants');

module.exports.cocktail_upload_image = (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({ secure_url: req.file.path });
};

module.exports.cocktail_get = async (req, res) => {
  try {
    const foundCocktails = await Cocktail.find().sort({ name: 1 });
    res.status(200).json(foundCocktails);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.cocktail_post = async (req, res) => {
  const { name, ingredients, image } = req.body;
  const token = req.cookies.jwt;
  const currentUserId = await jwt.verify(
    token,
    process.env.SECRET_KEY,
    async (error, decodedToken) => {
      return decodedToken.id;
    },
  );
  try {
    const createdCocktail = await Cocktail.create({
      name,
      ingredients,
      image,
      cocktailCreator: currentUserId,
    });
    const user = await User.findByIdAndUpdate(
      currentUserId,
      { $push: { myCocktails: createdCocktail } },
      { new: true },
    );
    res
      .status(201)
      .send(`Cocktail ${createdCocktail} was created successfully.`);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.cocktail_get_cocktail = async (req, res) => {
  const { cocktailId } = req.params;
  try {
    const foundCocktail = await Cocktail.findById(cocktailId);
    res.status(200).json(foundCocktail);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.cocktail_put = async (req, res) => {
  const { cocktailId } = req.params;
  const { name, ingredients } = req.body;
  try {
    const updatedCocktail = await Cocktail.findByIdAndUpdate(
      cocktailId,
      {
        name,
        ingredients,
      },
      { new: true },
    );
    res.status(200).json(updatedCocktail);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.cocktail_delete = async (req, res) => {
  const { cocktailId } = req.params;
  const token = req.cookies.jwt;
  const currentUserId = await jwt.verify(
    token,
    process.env.SECRET_KEY,
    async (error, decodedToken) => {
      return decodedToken.id;
    },
  );
  try {
    await User.findByIdAndUpdate(
      currentUserId,
      { $pull: { myCocktails: cocktailId } },
      { new: true },
    );
    const deletedCocktail = await Cocktail.findByIdAndDelete(cocktailId);
    res.status(200).send(`Post ${deletedCocktail} was removed successfully.`);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.popular_cocktails_get = (req, res) => {
  axios
    .all(
      QUERY_DATA.map((query) => {
        return axios.get(url, query);
      }),
    )
    .then(
      axios.spread((...responses) => {
        const cocktailData = [
          responses[0].data.drinks[0],
          responses[1].data.drinks[0],
          responses[2].data.drinks[0],
          responses[3].data.drinks[0],
          responses[4].data.drinks[0],
          responses[5].data.drinks[0],
          responses[6].data.drinks[0],
          responses[7].data.drinks[0],
        ];
        res.status(200).json(cocktailData);
      }),
    )
    .catch((error) => console.log(error));
};

module.exports.cocktails_by_name_post = (req, res) => {
  const cocktailName = req.body.nameValue;
  axios
    .get(`http://thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
    .then((response) => {
      res.status(200).json(response.data.drinks);
    })
    .catch((error) => console.log('errorrRRRRRrr'));
};
