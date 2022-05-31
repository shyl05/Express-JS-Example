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

//commentSchema.plugin(require('mongoose-autopopulate'));

const Comments = mongoose.model('Comments', commentSchema);
// Comments.find().populate("user")
// .then(p=>console.log(p))
// .catch(error=>console.log(error));


module.exports = Comments;

