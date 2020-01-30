const mongoose = require('mongoose');
const schema = mongoose.Schema;

const createAnswers = new schema({
    question_id:String,
    correct:Number
})

createAnswers.index({'question_id' : 'text'});

const answers = mongoose.model('Answers', createAnswers);

module.exports = answers;