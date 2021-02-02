const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const playersRouter = require('./routes/playersRoute');
const participationsRouter = require('./routes/participationsRoute');
const tournamentsRouter = require('./routes/tournamentsRoute');
const playerApiRouter = require('./routes/api/PlayerApiRoute');
const tournamentApiRouter = require('./routes/api/TournamentApiRoute');
const participationApiRouter = require('./routes/api/ParticipationApiRoute');
const sequelizeInit = require('./config/sequelize/init');
const session = require('express-session');


sequelizeInit()
.catch(err => {
  console.log(err);
})

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'my_secret_password',
    resave: false
}))

app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError) {
      res.locals.loginError = undefined;
  }
  next();
});

app.use('/', indexRouter);
app.use('/players', playersRouter);
app.use('/participations', participationsRouter);
app.use('/tournaments', tournamentsRouter);
app.use('/api/players', playerApiRouter);
app.use('/api/tournaments', tournamentApiRouter);
app.use('/api/participations', participationApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function( req, res, err) {
  console.log(req.params);
  console.log(req.body);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
