const log = require('../logger.js');

const xmlWriter = require('./xml-writer.js');
const jsonWriter = require('./json-writer.js');
const streamWriter = require('./write-stream-decorator.js');

const writers = {
    'json': jsonWriter,
    'xml':xmlWriter
};

module.exports = {
    format: (format) => {
        log.debug(`Find writer for format ${format}`);
        
        const writer = writers[format];
        if(!writer) {
            throw new Error(`Format ${format} not supported`);
        }

        return streamWriter.decorate(writer);
    }
};