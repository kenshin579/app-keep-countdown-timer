/* Custom logging module
 * to write appropriate logs into log files as well as console.
 */

var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: 'info',
            prettyPrint: true,
            colorize: true,
            silent: false,
            timestamp: function () {
                return (new Date()).toISOString();
            }
        })
    ]
});

module.exports = logger;
