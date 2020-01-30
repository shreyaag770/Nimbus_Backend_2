const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var passport = require('passport'),
    localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');

const app = express();

app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const User=require('./Models/Ambassador');
const Departments=require('./Models/Department');


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(Departments.authenticate()));
passport.serializeUser(Departments.serializeUser());
passport.deserializeUser(Departments.deserializeUser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/admin', adminRoutes);
app.use(userRoutes);

app.use('/views', userRoutes);

mongoose.connect('mongodb+srv://shweta:shweta@cluster0-s1od8.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true}).then(result => {
    app.listen(process.env.PORT || 8080);
    console.log('Database connected');
    console.log('Server Up and running');
}) 