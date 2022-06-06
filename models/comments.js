var mongoose = require('mongoose');
const {Schema} = mongoose;

var commentSchema = new Schema({
    comment:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'Users'
    }
}) 

// Auto populate Plugin



const Comments = mongoose.model('Comments', commentSchema);



module.exports = Comments;

