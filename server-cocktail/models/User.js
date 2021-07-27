const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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
    myCocktails: [{ type: Schema.Types.ObjectId, ref: "cocktail" }]
},
    {
        timestamps: {
            createdAt: 'create_at',
            updatedAt: 'updated_at'
        }
    });

//Hash password prior to doc being saved
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Login function
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) return user;
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
};

const User = mongoose.model('user', userSchema);

module.exports = User;