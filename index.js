'use strict';

const { GCSToBigQueryLoader } = require('access-logs-dw-gcp-js');

/**
 * Background Cloud Function to be triggered by Cloud Storage.
 *
 * @param {object} data The event payload.
 */
exports.loadJsonLinesIntoBigQuery = data => {
  // Metageneration attribute is updated on metadata changes. On create value is 1.
  if (data.metageneration !== '1') {
    return Promise.resolve();
  }

  return new GCSToBigQueryLoader().jsonLines(
    data.bucket, data.name, process.env.TARGET_DATASET, process.env.TARGET_TABLE);
};
