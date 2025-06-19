const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {type:String , required:true},
    description: {type:String},
    dueDate: {type:Date,required:true},
    createdAt: {type:Date, default:Date.now},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
});

module.exports = mongoose.model('Todo',todoSchema);