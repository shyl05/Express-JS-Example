var mongoose = require('mongoose');
const {Schema} = mongoose;

var commentSchema = new Schema({
    comment:{
        type:String,
        required:true
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'Users',
        required:true
    }
}) 

module.exports = mongoose.model('Comments', commentSchema);