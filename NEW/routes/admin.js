
const adminRoutes = require('../Controller/admin');

var express = require('express'),

    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
router = express.Router();

var passport = require('passport'),
    localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');

const Quizzes = require('../Models/Quiz');
const Departments=require('../Models/Department');
const Questions = require('../Models/Question');
const Answers = require('../Models/answers');

router.use(require("express-session")({
    secret : "I am good",
    resave : false,
    saveUninitialized : false
}));

router.use(passport.initialize());
router.use(passport.session());
passport.use(new localStrategy(Departments.authenticate()));
passport.serializeUser(Departments.serializeUser());
passport.deserializeUser(Departments.deserializeUser());
    

router.get('/viewQuizes',(req, res,next)=>
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

router.get('/quiz/:id',(req,res,next)=>
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


router.get('/quiz/createQuestions/:id',(req,res,next)=>{
    res.render("createQuestion",{
        id:req.params.id
    })
})

router.post('/quiz/createQuestions/:id',(req,res,next)=>{
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
        }) .then(results=>{
            Quizzes.findById(req.params.id)
            .then(quiz => {
                quiz.questionCount=quiz.questionCount+1;
                return quiz.save();
            })
            .then(result => {
                res.status(200)
            })
        })
        
        
        
        .then(result => {
            res.redirect('/admin/quiz/createQuestions/'+req.params.id);
        })
    })
    .catch(err => {
       console.log(err);
    })
   
})



router.get('/createQuiz',(req,res,next)=>{
    res.render('createQuiz');
   
})

router.post('/createQuiz',(req,res,next)=>{
    Quizzes.create({
                quizName:req.body.quizName,
                questionCount:0,
                department_id:req.user._id
            })
            .then(result => {
                // // res.status(200).send({id:result._id}); // this is is meant to be sent along with the questions array as 'quiz_id'
                res.redirect('/admin/viewQuizes');
               
            })
            .catch(err =>{
                console.log(err);
            })
   

})

router.get('/quiz/deleteQuestion/:id/:quiz_id',(req,res,next)=>{
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
    .then(results=>{
        Quizzes.findById(quiz_id)
        .then(quiz => {
            quiz.questionCount=quiz.questionCount-1;
            return quiz.save();
        })
        .then(result => {
            res.status(200)
        })
    })
    
    .then(results => {
         res.redirect('/admin/quiz/'+req.params.quiz_id);
    })
    .catch(err => {
        console.log(err);
    })
})

//Register
router.get('/register',function(req,res){
	res.render('register');
});


router.post('/register',function(req,res){
    Departments.register(new Departments({'departmentName':req.body.username,
    'username':req.body.username}),req.body.password,function(err){
		if(err)
			console.log(err);
		else{
			passport.authenticate("local")(req,res,function()
			{
				res.status(200)
			});
	}}
	);
});

//Login Route
router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local",{
    successRedirect : "/admin/viewQuizes",
    failureRedirect : "/admin/login"
}));

//Logout Route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/login");
})




module.exports = router;
