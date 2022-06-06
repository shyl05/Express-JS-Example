const express = require('express');
var router = express.Router();
var Comments = require('../models/comments');

// Adding Handlers - Middlewares
const successResponse = require('../middlewares/Handler');
const errorResponse = require('../middlewares/ErrorHandler');

/* GET Comments using comment Id */

router.get('/:id',(req,res)=>{
    Comments.findById(req.params.id).populate('user','userName').exec(function(err,comments){
        var errorRes;
        if(err){
            let status = res.statusCode=400;
            errorRes = errorResponse('Bad Request',status) 
            return res.send(errorRes);
        }
        else if(comments===null){
            let status = res.statusCode=404;
            errorRes = errorResponse('Sorry Not Found',status); 
            return res.send(errorRes);
        }
        let responseCode = res.statusCode=200;
        var response = successResponse('Success',responseCode,comments);
        res.send(response);
    })
})

/* Add New Comment */

router.post('/:id',async(req,res)=>{
    try{
        const body = req.body;
        let comment = new Comments(body);
        comment.user = req.params.id;
        await comment.populate('user','userName',function(err,result){
            if(err){
                let status = res.statusCode=400;
                var errorResp = errorResponse('Bad Request',status) 
                return res.send(errorResp);
            }
            result.save();
            let responseCode = res.statusCode=200;
            var response = successResponse('Success',responseCode,result);
            res.send(response);
        })
    }
    catch(err){
        let status = res.statusCode=500;
        var errorRes = errorResponse('Internal Server Error',status) 
        return res.send(errorRes);
    }
    
})

/* Update Comment */

router.put('/:id',(req,res)=>{
    const updateComment = req.body;
    Comments.findByIdAndUpdate(req.params.id,updateComment,{new:true},function(err,comment){
        if(err){
            let status = res.statusCode=400;
            var errorRes = errorResponse('Bad Request',status) 
            return res.send(errorRes);
        }
        let responseCode = res.statusCode=200;
        var response = successResponse('Success',responseCode,comment);
        res.send(response);
    })
})



/* Delete Comment */

router.delete('/:id',(req,res)=>{
    Comments.findByIdAndDelete(req.params.id,function(err,comment){
        if(err){
            let status = res.statusCode=400;
            var errorRes = errorResponse('Bad Request',status) 
            return res.send(errorRes);
        }
        let responseCode = res.statusCode=200;
        var response = successResponse('Success',responseCode,comment);
        res.send(response);
    })
})


/* GET Comments using user Id -- poulate('user field in comments', 'userName field inside user')*/

router.get('/user/:id',(req,res)=>{
    Comments.find({ user : req.params.id }).populate('user','userName').exec(function(err,comments){
        var errorRes;
        if(err){
            let status = res.statusCode=400;
            errorRes = errorResponse('Bad Request',status) 
            return res.send(errorRes);
        }
        else if(comments===null){
            let status = res.statusCode=404;
            errorRes = errorResponse('Sorry Not Found',status); 
            return res.send(errorRes);
        }
        let responseCode = res.statusCode=200;
        var response = successResponse('Success',responseCode,comments);
        res.send(response);
    })
})





module.exports = router;