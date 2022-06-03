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
    },
    realPerson:{
        type:Boolean,
        required:true,
        default:false
    },
    comments:[
        {
            type:Schema.Types.ObjectId,
            ref:"Comments"
        }
    ]
});


// // Schema Methods on each object;
// userSchema.methods.toggelRealPerson = () =>{
//     this.realPerson = !this.realPerson;
//     return this.save();
// }

const User = mongoose.model('Users',userSchema);
// User.find().populate("comments")
// .then(p=>console.log(p))
// .catch(error=>console.log(error));

// const findUser = async()=>{
//     const found = await User.findOne({userName:'YoungMoney'});
//     console.log(found);
//     await found.toggelRealPerson();
//     console.log(found);
// }

// findUser();

// Schema Virtuals:
userSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`;
})


module.exports = User;