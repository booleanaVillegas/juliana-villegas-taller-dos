var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

var db= require('./database');
var index = require('./routes/index');
var userRouter = require('./routes/user-router');
var postRouter = require('./routes/post-router');
var likeRouter = require('./routes/like-router');
var commentRouter = require('./routes/comment-router');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, '/public'));
//app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json({limit:'60mb'}));
app.use(bodyParser.urlencoded({extended:true, limit:'60mb'}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(multer({dest : './public/uploads/'}).single('photo'));
app.use('/', index);
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use('/likes', likeRouter);


db.conectar(function(err) {
    if (err) {
        console.log('La conexión falló');
        process.exit(1);
    } else {
        var host = 'localhost';
        var port = 3000;

        app.listen(port, host, function() {
            console.log("Servidor corriendo en: http://"
                + host + ":" + port+"/");
        });
    }

});

var router = express.Router();




/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/
/*
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
module.exports = app;
