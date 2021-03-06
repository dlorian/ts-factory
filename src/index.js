const tsFactory = require('./factory');
const formatTransformer = require('./format-transformer');
const log = require('./logger');

const stream = options => {
    const start = options.start;
    const end = options.end;
    const format = options.format || 'json';
    const granulartiy = options.granulartiy || 'hourly';
    const values = options.values || [];
    const debug = options.debug || false;

    log.init(debug);

    const tsStream = tsFactory.stream(start, end, {
        granulartiy,
        dstMode: '2424',
        values
    });
    const transformer = formatTransformer.transformerForFormat(format);

    return tsStream.pipe(transformer.stream());
};

module.exports = { stream };
