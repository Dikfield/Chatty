import mongoose from 'mongoose';
import Logger from 'bunyan';
import { config } from './config';

const log: Logger = config.createLogger('setupDatabase');
const DB = config.DATABASE!.replace('<password>', config.DATABASE_PASSWORD!);

export default () => {
  const connect = () => {
    mongoose
      .connect(DB)
      .then(() => {
        log.info('Successfully connect to database');
      })
      .catch((error) => {
        log.error('Error connecting do database', error);
        return process.exit();
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
