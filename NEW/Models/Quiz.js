const mongoose = require('mongoose');
const schema = mongoose.Schema;

const createQuiz = new schema({
    quizName:{
        type:String,
        required : true
    },
    questionCount:Number,
    department_id:{
        type:String,
        required:true
    }
});

createQuiz.index({department_id:'text'});

const Quizzes = mongoose.model('Quizzes', createQuiz);

module.exports = Quizzes;