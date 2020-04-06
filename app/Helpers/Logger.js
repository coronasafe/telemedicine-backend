/**
 * Logger helper
 */
import fs from 'fs';
import path from 'path';

const { createLogger, format, transports } = require('winston');
const winston = require('winston');
require('winston-daily-rotate-file');

const { combine, errors, json } = format;


const logFile = process.env.LOG_FILE;

// logs middleware
const logDirectory = path.join(__dirname, '../../storage/logs');

// ensure log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// create a rotating write stream

const dailyRotate = new (winston.transports.DailyRotateFile)({
  filename: `${logFile}-%DATE%.txt`,
  dirname: `${logDirectory}`,
  datePattern: 'YYYY-MM-DD-HH',
  auditFile: `${logDirectory}/auditfile.json`,
  createSymlink: true,
  symlinkName: 'log.txt',
  zippedArchive: false,
  maxSize: '2m',
  maxFiles: '14d',
});

const logTransports = [
  dailyRotate,
];

if (process.env.APP_ENV === 'development') {
  console.log('Enabling development log.................');
  logTransports.push(new transports.Console({
    format: format.simple(),
  }));
} else if (process.env.APP_ENV === 'staging') {
  console.log('Enabling staging log.................');
  logTransports.push(new transports.Console({
    format: format.simple(),
  }));
} else if (process.env.APP_ENV === 'production') {
  console.log('Enabling production log.................');
  logTransports.push(new transports.Console({
    format: format.simple(),
  }));
} else {
  console.log('##############################################################');
  console.log('Unknown environment');
  console.log('Enabling log.................');
  logTransports.push(new transports.Console({
    format: format.simple(),
  }));
}

const Logger = createLogger({
  format: combine(
    format.timestamp(),
    format.splat(),
    errors({ stack: true }),
    json(),
  ),
  transports: logTransports,
});

module.exports = Logger;
