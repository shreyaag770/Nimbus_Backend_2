var mongoose = require("mongoose");

var CoreSchema = new mongoose.Schema({
name :{type:String},
position:{type:String},
image:{type:String}
});

module.exports = mongoose.model("Core", CoreSchema);