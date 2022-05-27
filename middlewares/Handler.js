module.exports = function successResponse(msg,res,data){
    const message = {
        msg:msg,
        status:res.statusCode,
        organization:'WISSEN',
        data : data,
    };
    return message
};

