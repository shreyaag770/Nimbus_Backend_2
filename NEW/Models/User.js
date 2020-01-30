const mongoose = require('mongoose');
const schema = mongoose.Schema;

const createUser = new schema({
    Name:{type:String,required:true},
    profileImage:{type:String, required:true},
    campusAmbassador:{type:Boolean, required:true},
    collegeName:{type:String, required:true},
    phoneNumber:{type:Number, required:true},
    rollNumber :{type:Number, required:true},
    user_id:String
});

createUser.index({'rollNumber' : 'text'});

const User = mongoose.model('Users', createUser);

module.exports = User