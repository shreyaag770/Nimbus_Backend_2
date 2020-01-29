var passport = require('passport'),
    localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');



const mongoose = require('mongoose');
const schema = mongoose.Schema;

const createDepartment = new schema({
    departmentName:String,
    username:String,
    Password:String
})

createDepartment.index({departmentName : 'text'});

createDepartment.plugin(passportLocalMongoose);

const __departments__ = mongoose.model('Department', createDepartment);

module.exports = __departments__;