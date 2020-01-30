const Quizzes = require('../Models/Quiz');
const Departments = require('../Models/Department');
const Questions = require('../Models/Question');
const Answers = require('../Models/answers');
const Events = require('../Models/events');
const Users = require('../Models/User');
const Core = require('../Models/core');

const fs = require('fs');

const objectId = require('mongodb').ObjectID;

const profile = (req,res,next) => {
    Users.find({_id:objectId(req.headers['access-token'])}).then(result => {
        res.send(result);
    })
}

// add a catch block
const isalreadyRegistered = (req,res,next) => {
    Users.find({phoneNumber:req.body.phone}).then(result => {
        if(result){
            console.log(result);
            res.send({errorCode:0, token:result[0]._id})
        }
    }).catch(err => {
        res.send({erroCode : 1});
    })
}

const signup = (req,res,next) => {
    if(req.headers['access-token']){
        Users.find({_id:objectId(req.headers['access-token'])}).then(result => {
            if(result){
                Users.updateOne({_id:objectId(req.headers['access-token'])}, {$set:{
                    Name:req.body.name,
                    ProfileImage:req.body.image,
                    collegeName:req.body.college
                }
                }).then(result => {
                    res.send({errorCode : 0});
                })
            } 
        })
        
    } else {
        Users.find({$text:{$search:req.body.rollNumber}}).then(result => {
            if(result.length === 0){
            let last_id = fs.readFileSync('NIM_id.txt');
            user_id = 'NIM' + last_id.toString();
            last_id =  parseInt(last_id);
            last_id++;
            last_id+=1000;
            fs.writeFileSync('NIM_id.txt', last_id.toString().slice(1,4), (err) => {
                if(err) throw(err);
            })
                Users.create({
                    Name:req.body.name,
                    ProfileImage:req.body.image,
                    campusAmbassador : false,
                    collegeName : req.body.college,
                    phoneNumber : req.body.phone,
                    rollNumber : req.body.rollNumber,
                    user_id:user_id
                }).then(result => {
                    res.send({errorCode : 0, token: result._id});
                })
            } else {
                res.send({errorCode: 1});
            }
        })
    }
}


// add questionCount filter and send array of questions
const getQuestions = (req,res,next) => {
    Questions.find({$text:{$search:req.body.quiz_id}}).then(result => {
        if(result){
            res.send(result);
        }
    })
}

const getQuizzes = (req,res,next) => {
    Quizzes.find({$text:{$search:req.body.department_id}}).then(result => {
        if(result){
            res.send(result);
        }
    })
}

// add response and array filter !!
const verifyAnswer = (req,res,next) => {
    Answers.find({$text:{$search:req.body.question_id}}).then(result => {
        if(result[0].correct == req.body.correct){//take care about how the input is taken (text or int)
            console.log('Answer matches');
        }
    });
}

const getDepartments = (req, res, next) => {
    Departments.find({}).then(result => {
        let response = [];
        result.forEach(item => {
            response.push({departmentName:item.departmentName, departmentId:item._id})
        })
        res.send(response);
    })
}


const createDepartmentEvent = (req, res, next) => {
    Events.create({
        name: req.body.name,
        info: req.body.info,
        venue: req.body.venue,
        date: req.body.date, 
        image: req.body.image,
        regUrl: req.body.regUrl,
        type: 0,
    }).then(result => {
        res.send({'message':'success'});
        console.log('DepartmentEvent Created');
    }).catch(err => {
        res.status(400);
        res.send('failure');
    });
}

const getDepartmentEvents = (req, res, next) => {
    Events.find({ 'type': 0 }).then(result => {
        res.send(result);
    })
}

const createInstituteEvent = (req, res, next) => {
    Events.create({
        name: req.body.name,
        info: req.body.info,
        venue: req.body.venue,
        date: req.body.date,
        image: req.body.image,
        regUrl: req.body.regUrl,
        type: 1,
    }).then(result => {
        res.send({'message':'success'});
        console.log('InstituteEvent Created');
    }).catch(err => {
        res.status(400);
        res.send('failure');
    });
}

const getInstituteEvents = (req, res, next) => {
    Events.find({ 'type': 1 }).then(result => {
        res.status(200).send(result);
    })
}


const createTalk = (req, res, next) => {
    Events.create({
        name: req.body.name,
        info: req.body.info,
        venue: req.body.venue,
        date: req.body.date, 
        image: req.body.image,
        regUrl: req.body.regUrl,
        type: 2,
    }).then(result => {
        res.send({'message':'success'});
        console.log('Talk Created');
    }).catch(err => {
        res.status(400);
        res.send('failure');
    });
}

const getTalks = (req,res,next) => {
    Events.find({'type':2}).then(result => {
        res.send(result);
    })
}

const createExhibition = (req, res, next) => {
    Events.create({
        name: req.body.name,
        info: req.body.info,
        venue: req.body.venue,
        date: req.body.date, 
        image: req.body.image,
        regUrl: req.body.regUrl,
        type: 3,
    }).then(result => {
        res.send({ 'message': 'success' });
        console.log('Exhibition Created');
    })
}

const getExhibitions = (req, res, next) => {
    Events.find({ 'type': 3 }).then(result => {
        res.send(result);
    })
}

const createWorkshop = (req, res, next) => {
    Events.create({
        name: req.body.name,
        info: req.body.info,
        venue: req.body.venue,
        date: req.body.date, 
        image: req.body.image,
        regUrl: req.body.regUrl,
        type: 4,
    }).then(result => {
        res.send({ 'message': 'success' });
        console.log('Workshop Created');
    })
}

const getWorkshops = (req, res, next) => {
    Events.find({ 'type': 4 }).then(result => {
        res.send(result);
    })
}

const getCoreTeam = (req,res,next) => {
    Core.find({}).then(result =>{
        res.send(result);
    })
}

const makeCoreTeam = (req,res,next) =>{
    Core.create({
        name: req.body.name,
        position: req.body.position,
        image: req.body.image,
    }).then(result => {
        res.send({'message':'success'});
    });
}

exports.getQuestions = getQuestions;
exports.getQuizzes = getQuizzes;
exports.verifyAnswer = verifyAnswer;
exports.createDepartmentEvent = createDepartmentEvent;
exports.getDepartmentEvents = getDepartmentEvents;
exports.createInstituteEvent = createInstituteEvent;
exports.getInstituteEvents = getInstituteEvents;
exports.createTalk = createTalk;
exports.getTalks = getTalks;
exports.createExhibition = createExhibition;
exports.getExhibitions = getExhibitions;
exports.createWorkshop = createWorkshop;
exports.getWorkshops = getWorkshops;
exports.getQuestions = getQuestions;
exports.getQuizzes = getQuizzes;
exports.verifyAnswer = verifyAnswer;
exports.signup = signup;
exports.profile = profile;
exports.getDepartments = getDepartments;
exports.isalreadyRegistered = isalreadyRegistered;
exports.getCoreTeam = getCoreTeam;
exports.makeCoreTeam = makeCoreTeam;
