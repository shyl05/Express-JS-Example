var mongoose = require('mongoose');
const {Schema} = mongoose;
var userSchema = new Schema({
    firstName : {
        type:String,
        required:true
    },
    lastName : {
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        minlength: 8,
        maxlength: 18,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:70
    },
    selectNumber:{
        type:Number,
        min:0,
        max:99,
        default: 1
    }
});

module.exports = mongoose.model('Users', userSchema);