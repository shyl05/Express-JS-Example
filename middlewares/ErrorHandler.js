module.exports = function errorResponse(msg,error){
    const message = {
        msg : msg,
        status:error.statusCode,
        organization:'WISSEN',
    }
    return message;
}