/*eslint-disable */
const log = console.log;
/*eslint-enable */

const chalk = require('chalk');

const infoStyle = chalk.bold.white;
const debugStyle = chalk.bold.yellow;
const errorStyle = chalk.bold.red;

let loggerActive = false;

const init = (active = false) => (loggerActive = active);

const info = (message, ...args) => {
    if (loggerActive) log(infoStyle(message, args));
};

const debug = (message, ...args) => {
    if (loggerActive) log(debugStyle(message, args));
};

const error = (message, err) => {
    if (loggerActive) log(errorStyle(message, err));
};

module.exports = { debug, info, error, init };
