const express = require('express');

const router = express.Router();

const adminRoutes = require('../Controller/admin');

// webpage to post questions should access these routes

// router.post('/createDepartment', adminRoutes.createDepartment);
// router.post('/createQuiz', adminRoutes.createQuiz);
// router.post('/createQuestions', adminRoutes.CreateQuestion);
router.post('/login', adminRoutes.login);
router.get('/login',adminRoutes.getLogin);
router.get('/logout',adminRoutes.logout);
// router.get('/home',adminRoutes.Home);
// router.get('/createQuiz', adminRoutes.getCreateQuiz);
// router.get('/createQuestions',adminRoutes.getCreateQuestion);

module.exports = router;

