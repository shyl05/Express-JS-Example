const express = require('express');
var router = express.Router();
// var Users = require('../models/users');
var Comments = require('../models/comments');

// Adding Handlers - Middlewares
// const successResponse = require('../middlewares/Handler');
// const errorResponse = require('../middlewares/ErrorHandler');

/* GET Comments using Id */

router.get('/:id',(req,res)=>{
    Comments.findById(req.params.id,function(err,comments){
        if(err){
            res.send(err);
        }
        res.json(comments);
    })
})

/* GET Comments using user Id */

router.get('/user/:id',(req,res)=>{
    Comments.find({ user_id : req.params.id },function(err,comments){
        if(err){
            res.send(err);
        }
        res.json(comments);
    })
})

/* Add New Comment */

router.post('/:id',async(req,res)=>{
    try{
        const body = req.body;
        const comment = new Comments(body);
        comment.user_id = req.params.id;
        await comment.save();
        res.json(comment);
    }
    catch(err){
        res.json(err);
    }
    
})



module.exports = router;