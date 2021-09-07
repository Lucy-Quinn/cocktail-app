const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cocktailSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 150,
    },
    ingredients: [String],
    image: {
      type: String,
    },
    cocktailCreator: { type: Schema.Types.ObjectId, ref: 'user' },
  },
  {
    timestamps: {
      createdAt: 'create_at',
      updatedAt: 'updated_at',
    },
  },
);

const Cocktail = mongoose.model('cocktail', cocktailSchema);

module.exports = Cocktail;
