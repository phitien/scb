import winston from 'winston';

// Set up logger
const customColors = {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red'
};


const logger = new winston.Logger({
    colors: customColors,
    levels: {
        trace: 5,
        debug: 4,
        info: 3,
        warn: 2,
        error: 1,
        fatal: 0
    },
    transports: [
        new winston.transports.Console({
            level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'debug',
            colorize: true,
            timestamp: true
        })
    ]
});

winston.addColors(customColors);

// Extend logger object to properly log 'Error' types
const origLog = logger.log;

logger.log = (level, msg) => {
    var objType = Object.prototype.toString.call(msg);
    if (objType === '[object Error]') {
        origLog.call(logger, level, msg.stack);
    } else {
        origLog.call(logger, level, msg);
    }
};

/* LOGGER EXAMPLES
   app.logger.trace('testing');
   app.logger.debug('testing');
   app.logger.info('testing');
   app.logger.warn('testing');
   app.logger.crit('testing');
   app.logger.fatal('testing');
 */

export default logger;
