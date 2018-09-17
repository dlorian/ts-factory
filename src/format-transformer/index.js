const log = require('../logger.js');

const xmlFormatTransformer = require('./xml-transfromer');
const jsonFormatTransformer = require('./json-transformer');

const formatTransformer = {
    'json': jsonFormatTransformer,
    'xml': xmlFormatTransformer
};

module.exports = {
    transformerForFormat: (format) => {
        log.debug(`Find transformer for format ${format}`);

        const transformer = formatTransformer[format];
        if (!transformer) {
            throw new Error(`Format ${format} not supported`);
        }

        return transformer;
    }
};