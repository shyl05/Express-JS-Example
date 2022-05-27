module.exports = function errorResponse(msg,status){
    const message = {
        msg : msg,
        status:status,
        organization:'WISSEN',
    }
    return message;
}