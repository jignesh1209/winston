var appRoot = require('app-root-path');
var winston = require('winston');
require('winston-daily-rotate-file');

var options = {
    file:   {
        level: 'info',
        name: 'file.info',
        filename: `${appRoot}/logs/access/%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        timestamp: true,
        handleExceptions : true,
        json: true,
        maxsize: 5242880,
        maxFiles: 100,
        colorize: true
    },
    error: {
        level: 'error',
        name: 'file.error',
        filename: `${appRoot}/logs/error/%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        timestamp: true,
        handleExceptions : true,
        json: true,
        maxsize: 5242880,
        maxFiles: 100,
        colorize: true
    },
    console: {
        level:'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    }
};

// instantiate a new Winston Logger with the settings defined above
var logger = new winston.createLogger({
    transports: [
        new winston.transports.DailyRotateFile(options.file),
        new winston.transports.DailyRotateFile(options.error),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false
});


// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function(message, encoding){
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    }
}

module.exports = logger;