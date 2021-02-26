const mongoose=require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
var passportLocalMongoose = require('passport-local-mongoose')

const userSchema=new mongoose.Schema
({
    /*email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "Please enter email"],
    }, */
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "Please enter username"]
    }/*,
    password: {
        type: String
    },
    role: {
        type: String
    }*/
});

//userSchema.plugin(uniqueValidator, {message: 'is already taken.'});
userSchema.plugin(passportLocalMongoose)



module.exports = mongoose.model('user', userSchema);