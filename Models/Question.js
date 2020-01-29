const mongoose = require('mongoose');
const schema = mongoose.Schema;

const createQuestion = new schema({
    question:String,
    option1:String,
    option2:String,
    option3:String,
    option4:String,
    quiz_id:String
})

createQuestion.index({'quiz_id':'text'});

const questions = mongoose.model('Questions', createQuestion);

module.exports = questions;