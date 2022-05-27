const express = require('express');
var router = express.Router();
var Users = require('../models/users');
const bcrypt =require('bcryptjs');

// Adding Handlers - Middlewares
const successResponse = require('../middlewares/Handler');
const errorResponse = require('../middlewares/ErrorHandler');

/* GET All Users */
router.get('/',(req, res, next)=>{
  Users.find(function(error, users){
    if(error){
      var errorRes = errorResponse('Sorry',error) 
      return res.send(errorRes);
    } 
    var response = successResponse('Success',res,users);
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
        var response = successResponse('User added successfully',res);
        res.send(response);
      }).catch((err)=>{
        var errorRes = errorResponse('Sorry',err);
        return res.send(errorRes);
      })
    }); 
  }
  catch (error) {
    var errorRes = errorResponse('Sorry',error);
    return res.send(errorRes);
  }
})


module.exports = router;
