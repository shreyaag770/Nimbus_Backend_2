const mongoose=require('mongoose');

const Schema=mongoose.Schema;

var quizSchema = new Schema({
    'quizName': String,
    'deptName':String,
    'quiz': [{
      'question':String,
      'option1':String,
      'option2':String,
      'option3':String,
      'option4':String,
      'answer':Number
    }],
  
  });
  
  const Quiz = mongoose.model('Quiz', quizSchema);
   
  module.exports=Quiz;