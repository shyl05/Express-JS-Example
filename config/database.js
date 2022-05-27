const dbConfig = () =>{
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/ExpressExampleDB')
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err));
}
module.exports = dbConfig