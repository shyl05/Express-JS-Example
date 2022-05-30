module.exports = function successResponse(msg,responseCode,data){
    const message = {
        msg:msg,
        status:responseCode,
        organization:'WISSEN',
        data : data
    };
    return message
};

