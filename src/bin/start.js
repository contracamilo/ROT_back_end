#!/usr/bin/env node
import dotenv from 'dotenv';
import http from 'http';
import app from '../app';
import connect from '../utils/db';

/* eslint-disable no-console */

/**
 * Load environment variables from env file.
 */
dotenv.config();

/**
 * Create HTTP server.
 */
app.set('port', process.env.PORT || 3003);
const server = http.createServer(app);

/**
 * Connect to mongo database
 * Listen on provided port, on all network interfaces.
 */
run();

async function run() {
  await connect();
  server.listen(app.get('port'));
  server.on('error', onError);
  server.on('listening', onListening);
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  console.log(`REST API running → PORT ${server.address().port}`);
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  if (error.code === 'EACCES') {
    console.error(`Port ${app.get('port')} requires elevated privileges`);
    process.exit(1);
  } else if (error.code === 'EADDRINUSE') {
    console.error(`Port ${app.get('port')} is already in use`);
    process.exit(1);
  } else {
    throw error;
  }
}
