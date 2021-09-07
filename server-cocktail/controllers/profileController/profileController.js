const User = require('../../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.profile_get_profile = async (req, res) => {
  const token = req.cookies.jwt;

  try {
    const currentUserId = await jwt.verify(
      token,
      process.env.SECRET_KEY,
      async (error, decodedToken) => {
        return decodedToken.id;
      },
    );
    const foundUser = await User.findById(currentUserId).populate({
      path: 'myCocktails',
      model: 'cocktail',
    });
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.profile_put_profile = async (req, res) => {
  const { profileId } = req.params;

  const { name, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      profileId,
      {
        name,
        email,
      },
      { new: true },
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.profile_delete_profile = async (req, res) => {
  const { profileId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(profileId);
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).send(`Post ${deletedUser} was removed successfully.`);
  } catch (error) {
    res.status(400).json(error);
  }
};
