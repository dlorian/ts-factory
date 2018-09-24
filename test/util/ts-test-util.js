const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const streamEqual = require('stream-equal');

const buildErrorMessage = (outputFile, sampleFile) => {
    return `"${outputFile}" does not match the expected time series in "${sampleFile}"`;
};
const resolveFilePath = (dir, file) => {
    return path.join(__dirname, '..', dir, file);
};

const createWriteStream = outputFile => {
    return fs.createWriteStream(outputFile, { encoding: 'utf8' });
};

const compareFiles = (testDir, outputFile, sampleFile, done) => {
    const outputFilePath = resolveFilePath(testDir, outputFile);
    const sampleFilePath = resolveFilePath(testDir, sampleFile);

    const exists = fs.existsSync(outputFilePath);
    expect(exists, `${outputFile} does not exists as expected`).to.be.true;

    const readStream1 = fs.createReadStream(outputFilePath);
    const readStream2 = fs.createReadStream(sampleFilePath);

    streamEqual(readStream1, readStream2, (err, result) => {
        expect(result, buildErrorMessage(outputFile, sampleFile)).to.be.true;
        done();
    });
};

const assertTsStream = (tsStream, testDir, outputFile, sampleFile, done) => {
    const writeStream = createWriteStream(resolveFilePath(testDir, outputFile));

    tsStream
        .pipe(writeStream) // We write the stream to file in order to can make a diff when test fails
        .on('finish', () =>
            compareFiles(testDir, outputFile, sampleFile, done)
        );
};

module.exports = { assertTsStream };
