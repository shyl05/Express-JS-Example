const express = require('express');
var router = express.Router();
var Users = require('../models/users');
var Comments = require('../models/comments');
const bcrypt =require('bcryptjs');

// Adding Handlers - Middlewares
const successResponse = require('../middlewares/Handler');
const errorResponse = require('../middlewares/ErrorHandler');

/* GET All Users */
router.get('/',(req, res, next)=>{
  Users.find(function(error, users){
    if(error){
      let status = res.statusCode=400;
      var errorRes = errorResponse('Bad Request',status) 
      return res.send(errorRes);
    } 
    else if(users.length===0){
      let status = res.statusCode=404;
      var errorRes = errorResponse('Sorry Empty Users',status) 
      return res.send(errorRes);
    }
    let responseCode = res.statusCode=200;
    var response = successResponse('Success',responseCode,users);
    res.send(response);
  })
});


/* Add New User */
router.post('/add',(req, res, next)=>{
  try {
    const body = req.body;
    const user = new Users(body);
    bcrypt.genSalt(10, async(err, salt)=>{
      await bcrypt.hash(user.password, salt).then((encrypt)=>{
        user.password = encrypt;
        user.save()
      }).then(()=>{
        let responseCode = res.statusCode=200
        var response = successResponse('User added successfully',responseCode);
        res.send(response);
      }).catch((err)=>{
        let status = res.statusCode=400;
        var errorRes = errorResponse('OOPS! User registration failed',status);
        return res.send(errorRes);
      })
    }); 
  }
  catch (error) {
    let status = res.statusCode=500;
    var errorRes = errorResponse('Internal Error',status);
    return res.send(errorRes);
  }
});

/* Get Single User By id - Comments will fetch from Comments collection*/

router.get('/user/:id',(req,res)=>{
  Users.findById(req.params.id)
  .exec(
    function(error,user){
      Comments.find({user:req.params.id},function(err,comments){
        if(err){
          console.log(err);
        }
        if(error){
          let status = res.statusCode=400;
          var errorRes = errorResponse('Bad Request',status) 
          return res.send(errorRes);
        } 
        else if(user.length===0){
          let status = res.statusCode=404;
          var errorRes = errorResponse('Sorry User Not Found',status) 
          return res.send(errorRes);
        } 
        user.comments = user.comments.concat(comments);
        let responseCode = res.statusCode=200;
        var response = successResponse('Success',responseCode,user);
        return res.send(response);
        })
      })
      
    }
  );  

/* Get Single User By username - Comments will not fetch*/

router.get('/username/:username',(req,res,err)=>{
  Users.find({userName:req.params.username},function(error,user){
    if(error){
      let status = res.statusCode=400;
      var errorRes = errorResponse('Bad Request',status) 
      return res.send(errorRes);
    }
    else if(user.length===0){
      let status = res.statusCode=404;
      var errorRes = errorResponse('Sorry User Not Found',status); 
      return res.send(errorRes);
    }
    let responseCode = res.statusCode=200;
    var response = successResponse('Success',responseCode,user);
    res.send(response);
  })
})


module.exports = router;
