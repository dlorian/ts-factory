const log = require('./logger');
const tsFactory = require('./factory');
const formatTransformer = require('./format-transformer');

const stream = (options) => {
    log.info(`ts-factory stream for ${options}`);
    
    const start = options.start;
    const end = options.end;
    const format = options.format || 'json';
    const dstMode = options.dst || '2424';
    const granulartiy = options.granulartiy || 'HOURLY';

    const tsStream = tsFactory.stream(start, end, { granulartiy, dstMode });
    const transformer = formatTransformer.transformerForFormat(format);

    return tsStream.pipe(transformer.stream());
};

const testFn = (opt) => stream(opt).on('data', (data) => console.log(data));
testFn({
    start: '2018-08-01',
    end: '2018-09-01',
    format: 'json',
    granularity: 'hourly'
});

module.exports = { stream };
