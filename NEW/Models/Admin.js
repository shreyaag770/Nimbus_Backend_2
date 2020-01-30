const mongoose=require('mongoose');

const Schema=mongoose.Schema;

var passport = require('passport'),
    localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');

var AdminSchema = new mongoose.Schema({
    username : String,
    password : String

});

AdminSchema.plugin(passportLocalMongoose);

var Admin = mongoose.model('Admin', AdminSchema);

module.exports=Admin;
