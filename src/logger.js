
const debug = (message) => {
    console.debug(message);
};

const info = (message, object) => {
    console.info(message.replace('{}', object ? JSON.stringify(object) : ''));
};

const error = (message, err) => {
    console.error(message, err);
};

module.exports = { debug, info, error };