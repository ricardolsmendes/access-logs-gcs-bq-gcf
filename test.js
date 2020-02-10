'use strict';

const assert = require('assert');
const sinon = require('sinon');

const { GCSToBigQueryLoader } = require('access-logs-dw-gcp-js');

const { loadJsonLinesIntoBigQuery } = require('./index');

describe('loadJsonLinesIntoBigQuery', () => {

  var jsonLinesStub;

  beforeEach(() => {
    jsonLinesStub = sinon.stub(GCSToBigQueryLoader.prototype, 'jsonLines').returns(
      Promise.resolve());
  });

  it('returns a promise', () => {
    const loadJsonLinesIntoBigQueryReturn = loadJsonLinesIntoBigQuery({
      metageneration: '2',
      bucket: 'testBucket',
      name: 'test.jsonl'
    });

    assert.strictEqual(Object.prototype.toString.call(loadJsonLinesIntoBigQueryReturn),
      '[object Promise]');
  });

  it('ignores a file that was not created, e.g. updated or deleted', () => {
    loadJsonLinesIntoBigQuery({
      metageneration: '2', // On create value is 1.
      bucket: 'testBucket',
      name: 'test.jsonl'
    });

    sinon.assert.notCalled(jsonLinesStub);
  });

  it('loads a file that was created', () => {
    loadJsonLinesIntoBigQuery({
      metageneration: '1',
      bucket: 'testBucket',
      name: 'test.jsonl'
    });

    const sourceBucketName = jsonLinesStub.getCall(0).args[0];
    const sourceFileName = jsonLinesStub.getCall(0).args[1];

    assert.strictEqual(sourceBucketName, 'testBucket');
    assert.strictEqual(sourceFileName, 'test.jsonl');
  });

  it('reads target dataset name from an environment variable', () => {
    process.env.TARGET_DATASET = 'testTargetDataset';

    loadJsonLinesIntoBigQuery({
      metageneration: '1',
      bucket: 'testBucket',
      name: 'test.jsonl'
    });

    const targetDatasetName = jsonLinesStub.getCall(0).args[2];

    assert.strictEqual(targetDatasetName, 'testTargetDataset');

    delete process.env.TARGET_DATASET;
  });

  it('reads target table name from an environment variable', () => {
    process.env.TARGET_TABLE = 'testTargetTable';

    loadJsonLinesIntoBigQuery({
      metageneration: '1',
      bucket: 'testBucket',
      name: 'test.jsonl'
    });

    const jsonKeysCase = jsonLinesStub.getCall(0).args[3];

    assert.strictEqual(jsonKeysCase, 'testTargetTable');

    delete process.env.TARGET_TABLE;
  });

  afterEach(() => {
    jsonLinesStub.restore();
  });

});
