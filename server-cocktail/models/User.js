const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 55,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true,
    },
    myCocktails: [{ type: Schema.Types.ObjectId, ref: "cocktail" }]
},
    {
        timestamps: {
            createdAt: 'create_at',
            updatedAt: 'updated_at'
        }
    });

const User = mongoose.model('user', userSchema);

module.exports = User;