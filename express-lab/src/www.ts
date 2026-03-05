import {runDB} from 'src/infrastructure/mongo/db.ts'
import app from './app.ts';
import dotenv from "dotenv";
import http from 'http';
import {type HttpError} from "http-errors";
import debugLib from 'debug';

dotenv.config();

const debug = debugLib('fullstack-lab/express-lab:server');

runDB()

const port = parseInt(process.env.PORT || '3000', 10);
app.set('port', port);

const server = http.createServer(app);

const onError = (error: HttpError) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  const errorMessages: Record<string, string> = {
    EACCES: 'requires elevated privileges',
    EADDRINUSE: 'is already in use',
  }
  const reason = errorMessages[error.code || '']
  if (reason) {
    console.error(`Port ${port} ${reason}`)
    process.exit(1)
  }
  throw error
}

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr?.port;
  debug('Listening on ' + bind);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
