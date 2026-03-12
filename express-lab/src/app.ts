import apiRouter from './routes/api.router.ts';
import {config} from 'src/config/config.ts'
import indexRouter from './routes/index.ts';
import createError, {type HttpError} from 'http-errors';
import express, {type Request, type Response, type NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

export const app = express();

// view engine setup
app.set('views', path.join(process.cwd(), 'src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.cookies.secret));
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  if (req.originalUrl.startsWith('/api')) {
    res.json({
      message: err.message,
      error
    })
  } else {
    res.locals.message = err.message
    res.locals.error = error
    res.render('error')
  }
})

export default app;
