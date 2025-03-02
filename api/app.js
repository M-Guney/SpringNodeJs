require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

//const database = require('./config/database');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log("Ben app.js te tanımlanamn Middleware'im");
  next();
});

app.use('/api', require('./routes/index')); // http://localhost:3000/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
/* git push --set-upstream origin feature/m-guney/1 de hata alınırsa 
ERROR:
/feature' exists; cannot create 'refs/heads/feature/m-guney/1')
error: failed to push some refs to 'https://github.com/M-Guney/SpringNodeJs.git'
SOLUTION:
git branch -d feature
git push origin --delete feature
git push --set-upstream origin feature/m-guney/1

PS C:\Users\msule\OneDrive\Belgeler\GitHub\SpringNodeJs\api> git branch -d feature
error: branch 'feature' not found
PS C:\Users\msule\OneDrive\Belgeler\GitHub\SpringNodeJs\api> git push origin --delete feature
>>*/