# access-logs-gcs-bq-gcf

Google Cloud Function to load data from a GCS file into a BigQuery Table.

[![js-standard-style][1]][2] [![CircleCI][3]][4]

_This repository is part a project described in the article
[Serverless ETL on Google Cloud, a case study: raw data into JSON Lines][5]._

## Environment variables

Below environment variables are required by the function:

| NAME             | DESCRIPTION                           |
| ---------------- | ------------------------------------- |
| `TARGET_DATASET` | BigQuery Dataset to store the output. |
| `TARGET_TABLE`   | BigQuery Table to store the output.   |

## Using Cloud Build to deploy

Present function is deployable through Cloud Build (build spec file: `.cloudbuild/cloudbuild.yaml`).

Below substitution variables are required by the build job:

| NAME               | DESCRIPTION                                                                           |
| ------------------ | ------------------------------------------------------------------------------------- |
| `_FUNCTION_NAME`   | ID or fully qualified identifier for the function.                                    |
| `_MAX_INSTANCES`   | Maximum number of instances for the function.                                         |
| `_SERVICE_ACCOUNT` | The email address of the IAM service account associated with the function at runtime. |
| `_SOURCE`          | Location of source code to deploy.                                                    |
| `_TARGET_DATASET`  | BigQuery Dataset to store the output.                                                 |
| `_TARGET_TABLE`    | BigQuery Table to store the output.                                                   |
| `_TRIGGER_BUCKET`  | GCS Bucket that will trigger the Cloud Function on file-related events.               |

You may refer to [gcloud functions deploy docs][6] for instructions on how to fulfill some of the
variables.

## How to contribute

Please make sure to take a moment and read the [Code of
Conduct](https://github.com/ricardolsmendes/access-logs-gcs-bq-gcf/blob/master/.github/CODE_OF_CONDUCT.md).

### Report issues

Please report bugs and suggest features via the [GitHub
Issues](https://github.com/ricardolsmendes/access-logs-gcs-bq-gcf/issues).

Before opening an issue, search the tracker for possible duplicates. If you find a duplicate, please
add a comment saying that you encountered the problem as well.

### Contribute code

Please make sure to read the [Contributing
Guide](https://github.com/ricardolsmendes/access-logs-gcs-bq-gcf/blob/master/.github/CONTRIBUTING.md)
before making a pull request.

[1]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[2]: http://standardjs.com
[3]: https://circleci.com/gh/ricardolsmendes/access-logs-gcs-bq-gcf.svg?style=svg
[4]: https://circleci.com/gh/ricardolsmendes/access-logs-gcs-bq-gcf
[5]: https://medium.com/google-cloud/serverless-etl-on-google-cloud-a-case-study-raw-data-into-json-lines-d20711cd3917
[6]: https://cloud.google.com/sdk/gcloud/reference/functions/deploy
