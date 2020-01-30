const Quizzes = require('../Models/Quiz');
const Departments = require('../Models/Department');
const Questions = require('../Models/Question');
const Answers = require('../Models/answers');


//****************** */
// req.body.<name> should match the input field name attribute on the webpage for all the routes below

// update the questionCount as in the Quiz schema when admin adds or deletes the question (this is to reject quizzes with less than 10 questions when quizzes are sent to app)

// make sure createQuiz or addQuestion pages are not available before the login is done (by simply changing the link in the browser)

//make sure we don't have a quiz with same name for same department

//****************** */


const createDepartment =  (req,res,next) => {
    Departments.create({
        departmentName:req.body.departmentName,
        Password:req.body.password
    }).then(result => {
        res.status(200).send({message:'Department Created'});
    })
}

const login = (req,res,next) => {
    Departments.findOne({departmentName: req.body.departmentName, Password : req.body.password}).then(result => {
        if(result){
            res.status(200).send({id:result._id}); // this id is meant to be sent while creating quiz as 'department_id'
        }
    })
}

const createQuestion = (req,res,next) => {
    Questions.create({
        question:req.body.question,
        option1:req.body.option1,
        option2:req.body.option2,
        option3:req.body.option3,
        option4:req.body.option4,
        quiz_id:req.body.quiz_id
    }).then(result => {
        Answers.create({
            question_id: result._id,
            correct:req.body.correct
        }).then(result => {
            res.status(200)
        })
    })
}

const createQuiz = (req,res,next) => {
    Quizzes.create({
        quizName:req.body.quizName,
        questionCount:0,
        department_id:req.body.department_id
    }).then(result => {
        res.status(200).send({id:result._id}); // this is is meant to be sent along with the questions array as 'quiz_id'
    })
}



exports.createDepartment = createDepartment;
exports.createQuiz = createQuiz;
exports.createQuestion = createQuestion;
exports.login = login;
