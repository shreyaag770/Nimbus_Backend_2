const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    name:String,
    profilePic:String,
    isAmb:Number,
    college:String,
    phoneNo:Number,
    rollNo:String
})

const User = mongoose.model('User', userSchema);

module.exports = User;