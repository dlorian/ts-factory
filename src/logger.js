
const debug = (message) => {
    console.debug(message);
};

const info = (message) => {
    console.info(message);
};

const error = (message, err) => {
    console.error(message, err);
};

module.exports = { debug, info, error };