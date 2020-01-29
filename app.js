var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose')
    

//Importing passport libraries
var passport = require('passport'),
    localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');

// const adminRoutes = require('./routes/admin');

app.set("view engine","ejs");
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({extended:true}));

// app.use(adminRoutes);

const Quizzes = require('./Models/Quiz');
const Departments=require('./Models/Department')
const Questions = require('./Models/Question');
const Answers = require('./Models/answers');

//Express-session setup
app.use(require("express-session")({
    secret : "I am good",
    resave : false,
    saveUninitialized : false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(Departments.authenticate()));
passport.serializeUser(Departments.serializeUser());
passport.deserializeUser(Departments.deserializeUser());


app.get('/viewQuizes',(req, res,next)=>
 {
    Quizzes.find({department_id:req.user._id}, function(err, results){
        if(err)
            console.log(err);
        else
        {
            res.render("viewQuizes",
            {
                quiz:results
            });
            
        }
    });    
});

app.get('/quiz/:id',(req,res,next)=>
{
    Questions.find({quiz_id:req.params.id}, function(err, results){
        if(err)
            console.log(err);
        else
        {
            res.render("viewQuestions",
            {
                id:req.params.id,
                ques:results
            });
            
        }
    });    
});


app.get('/quiz/createQuestions/:id',(req,res,next)=>{
    res.render("createQuestion",{
        id:req.params.id
    })
})

app.post('/quiz/createQuestions/:id',(req,res,next)=>{
    Questions.create({
        question:req.body.question,
        option1:req.body.option1,
        option2:req.body.option2,
        option3:req.body.option3,
        option4:req.body.option4,
        quiz_id:req.params.id
    }).then(result => {
        Answers.create({
            question_id: result._id,
            correct:req.body.answer
        }).then(result => {
            res.redirect('/quiz/createQuestions/'+quiz_id);
        })
    })
   
})

app.get('/createQuiz',(req,res,next)=>{
    res.render('createQuiz');
   
})

app.post('/createQuiz',(req,res,next)=>{
    Quizzes.create({
                quizName:req.body.quizName,
                questionCount:0,
                department_id:req.user._id
            })
            .then(result => {
               res.redirect('/viewQuizes');   
            })
            .catch(err =>{
                console.log(err);
            })
})

app.get('/quiz/deleteQuestion/:id/:quiz_id',(req,res,next)=>{
    const quiz_id=req.params.quiz_id;
    Questions.remove({ _id: req.params.id })
    .then(results =>  {
        Quizzes.find({_id:quiz_id}, function(err, results){
        if(err)
            console.log(err);
        else
        {
            results[0].questionCount=results[0].questionCount-1;
           
        }
    })  
    })
    .then(results => {
        console.log(quiz_id);
         res.redirect('/quiz/'+quiz_id);
    })
    .catch(err => {
        console.log(err);
    })
})

//Register
app.get('/register',function(req,res){
	res.render('register');
});


app.post('/register',function(req,res){
    Departments.register(new Departments({'departmentName':req.body.username,
    'username':req.body.username}),req.body.password,function(err){
		if(err)
			console.log(err);
		else{
			passport.authenticate("local")(req,res,function()
			{
				res.send("OK");
			});
	}}
	);
});

//Login Route
app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", passport.authenticate("local",{
    successRedirect : "/viewQuizes",
    failureRedirect : "/login"
}));

//Logout Route
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/login");
})



mongoose.connect(
    'mongodb+srv://shweta:shweta@cluster0-s1od8.mongodb.net/test?retryWrites=true&w=majority'
  )
  .then(result =>{
    console.log("Successfully connected");
    app.listen(300);
  })
  .catch(err=>{
  console.log(err);
  });
  
