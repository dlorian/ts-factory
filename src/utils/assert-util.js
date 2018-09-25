const isDefined = (value, message) => {
    if (!value) {
        throw new Error(message || 'value must be defined');
    }
};

module.exports = { isDefined };
