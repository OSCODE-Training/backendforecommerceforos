var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt=require('jsonwebtoken');
var database = require('./src/configure/database');
database()
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRouter = require("./routes/user");
var categoryRouter = require("./routes/category");
var productRouter = require("./routes/product");
var transactionRouter = require("./routes/transaction");
var orderRouter = require("./routes/order");
var cartRouter = require("./routes/cart");
var userqueryRouter = require("./routes/userquery");
var loginRouter = require("./routes/login");
var categoryuRouter = require("./routes/categoryu");
var productuRouter = require("./routes/productu");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/categoryu',categoryuRouter);
app.use('/productu',productuRouter);





app.use( (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(token);
  jwt.verify(token, "shhhhhh", function (err, decoded) {
    // console.log(err, decoded);
    // res.status(200).json(decoded);
    if (decoded) {
      next();
    } else {
      res.status(401).json({ status: false, message: "Invalid token" });
    }
  });
});




app.use('/user',userRouter);
app.use('/category',categoryRouter);
app.use("/product",productRouter);
app.use("/transaction",transactionRouter);
app.use("/order",orderRouter);
app.use("/cart",cartRouter);
app.use('/userquery',userqueryRouter);

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
