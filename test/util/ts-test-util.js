const fs = require('fs');
const path = require('path');
const { expect } = require('chai');

const buildErrorMessage = (outputFile, sampleFile) => {
    return `"${outputFile}" does not match the expected time series in "${sampleFile}"`;
};
const resolveFilePath = (dir, file) => {
    return path.join(__dirname, '..', dir, file);
};

const createWriteStream = outputFile => {
    return fs.createWriteStream(outputFile, { encoding: 'utf8' });
};

const totringWithoutWhitespaces = buffer => {
    return buffer.toString().replace(/\s/g, '');
};

const readFileAsString = filePath => {
    const fileBuffer = fs.readFileSync(filePath, 'utf-8');
    return totringWithoutWhitespaces(fileBuffer);
};

const compareFiles = (testDir, outputFile, sampleFile, done) => {
    const outputFilePath = resolveFilePath(testDir, outputFile);
    const sampleFilePath = resolveFilePath(testDir, sampleFile);

    const exists = fs.existsSync(outputFilePath);
    expect(exists, `${outputFile} does not exists as expected`).to.be.true;

    const outputString = readFileAsString(outputFilePath);
    const sampleString = readFileAsString(sampleFilePath);

    expect(outputString, buildErrorMessage(outputFile, sampleFile)).to.be.equal(
        sampleString
    );
    done();
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
