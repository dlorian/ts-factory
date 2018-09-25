const tsFactory = require('./factory');
const formatTransformer = require('./format-transformer');

const stream = options => {
    const start = options.start;
    const end = options.end;
    const format = options.format || 'json';
    const dstMode = options.dst || '2424';
    const granulartiy = options.granulartiy || 'HOURLY';
    const values = options.values || [];

    const tsStream = tsFactory.stream(start, end, {
        granulartiy,
        dstMode,
        values
    });
    const transformer = formatTransformer.transformerForFormat(format);

    return tsStream.pipe(transformer.stream());
};

module.exports = { stream };
