const express = require('express');

const router = express.Router();

const userRoutes = require('../Controller/user');

// these routes should be accessed by nimbus app only
router.post('/quiz/departments', userRoutes.getQuizzes);
router.post('/quiz/questions', userRoutes.getQuestions);
router.get('/auth/profile', userRoutes.profile);
router.get('/quiz/departments', userRoutes.getDepartments);
router.get('/coreTeam', userRoutes.getCoreTeam);

router.post('/auth/signup', userRoutes.signup);
router.post('/auth/isUser', userRoutes.isalreadyRegistered);
router.post('/quiz/submit', userRoutes.verifyAnswer);
router.post('/coreTeam', userRoutes.makeCoreTeam);



router.get('/setAmb',function(req,res){
	User.findOneAndUpdate({username:req.body.username,password:req.body.password},{$set:{'isAmb':1}},function(err,ress){
	//console.log('done')
	res.send({'token':'abcd'})
});
});


router.get('/departmentEvents', userRoutes.getDepartmentEvents);

router.post('/departmentEvents', userRoutes.createDepartmentEvent);

router.get('/instituteEvents', userRoutes.getInstituteEvents);

router.post('/instituteEvents', userRoutes.createInstituteEvent);

router.get('/talks', userRoutes.getTalks);

router.post('/talks', userRoutes.createTalk);

router.get('/exhibitions', userRoutes.getExhibitions);

router.post('/exhibitions', userRoutes.createExhibition);

router.get('/workshops', userRoutes.getWorkshops);

router.post('/workshops', userRoutes.createWorkshop);


function isAmb(){
var token=req.body.token;
User.findOne({token:token},function(err,ress){
if(ress)
return next();
});
}

module.exports = router;