/* eslint-disable no-console */
import mongoose from 'mongoose';

const connect = (url = process.env.DATABASE, opts = {}) => {
  mongoose.connection.on('error', err => {
    console.log('Error in DB connection:');
    console.error(err);
  });

  mongoose.connection.on('connecting', () => {
    console.log('Connecting to MongoDB...');
  });

  mongoose.connection.on('connected', () => {
    console.log('Connection with MongoDB established successfully');
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected successfully');
  });

  mongoose.connection.on('reconnectFailed', () => {
    console.error('Reconnection with MongoDB failed');
  });

  try {
    mongoose.connect(url, {
      ...opts,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  } catch (error) {
    console.warn('Error trying to connect to database');
    console.error(error);
  }
};

export default connect;
