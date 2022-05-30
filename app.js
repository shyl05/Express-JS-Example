var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors=require('cors')


// Routes

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commentsRouter = require('./routes/comments');

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');

// CORS policy

app.use(express.json())
var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments',commentsRouter);


// Main Error Handler

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const errorResponse = require('./middlewares/ErrorHandler');

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  var resstatus = res.statusCode = 400;
  var errorRes = errorResponse("Bad Request",resstatus) ;
  res.send(errorRes);
});

module.exports = app;

// PORT
const port=process.env.PORT || 7000

// using database from config
const dbConfig=require('./config/database');
dbConfig();

app.listen(port,()=>{
  console.log("Server is running on port : ",port)
})