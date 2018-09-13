const log = require('../logger.js');

const { createWriteStream } = require('fs');

const write = function (fileName, stream, writer) {
    return new Promise((resolve, reject) => {
        const ws = createWriteStream(`${fileName}`, { flags: 'w', encoding: 'utf8' });

        log.debug(`Writing data to file ${fileName}`);

        stream
            .on('finish', () => resolve())
            .on('error', (err) => reject(err))
            .pipe(writer.stream())
            .pipe(ws);
    });
};

const decorate = (writer) => {
    return {
        write: (fileName, stream) => write(fileName, stream, writer)
    };
}

module.exports = { decorate };