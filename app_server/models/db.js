const mongoose = require('mongoose');
const readLine = require('readline');
const location = require('../locations/location');
const config = require('../config');

var dbURI = config.localDbURI;
if (process.env.NODE_ENV === 'production') {
  dbURI = config.mLapURI;
}
mongoose.connect(dbURI, {
  useMongoClient: true
});

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

var gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

// Listen for SIGUSR2, which is what nodemon uses
process.once('SIGUSR2', function () {
  // Send message to gracefulShutdown and callback to kill process, emitting SIGUSR2 again
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// Listen for SIGINT emitted on application termination
process.on('SIGINT', function () {
  // Send message to gracefulShutdown and callback to exit Node process
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});

// Listen for SIGTERM emitted when Heroku shuts down process
process.on('SIGTERM', function() {
  // Send message to gracefulShutdown and callback to exit Node process
  gracefulShutdown('Heroku app shutdown', function () {
    process.exit(0);
  });
});

// Listening for SIGINT on Windows
if (process.platform === "win32") {
  var rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('SIGINT', function() {
    process.emit('SIGINT')
  });
}
