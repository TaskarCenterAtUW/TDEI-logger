# TDEI-Logger
General logger for all the queue messages that happen over the TDEI system


Things to capture:

- stage
- type of file
- record id
- last updated
- record created at
- status
- status message
- user
- org
- history
    - original message content


## GetStatus API
PATH : `<baseurl>/status?tdeiRecordId=<recordId>`
This is a single API with no authorization rules. This API is responsible for sending in the status of an uploaded file
and the history of actions/validations that happened to it.

Example response:

When something fails
```json
{
    "tdeiRecordId": "d2c6b3512d634d6fb315b80588ad30ff",
    "stage": "flex-data-service failed",
    "isComplete": true,
    "status": "Error occured while processing flex requestError: Service id not found or inactive."
}
```
When process is complete
```json
{
    "tdeiRecordId": "70b5cff7dd7b46cd88a0d3df89f6e9d8",
    "stage": "flex-data-service",
    "isComplete": true,
    "status": "Processing complete"
}
```
When it is in progress
```json
{
    "tdeiRecordId": "105402ac9ac149999dd78e463c4eb049",
    "stage": "Flex-Validation",
    "isComplete": false,
    "status": "Pending with data-service"
}
```

## GetReport API
PATH : `<baseurl>/report?tdeiRecordId=<recordId>`
This API gives out the complete history of the record

# Testing
Unit testing for the application is done with `jest` framework.

To run the unit tests, use the following commands :

`npm install`

`npm run test`


The generated report will be at `test-report.html` (generated after running the tests)

## Integration tests
To run integration tests, a .env file is needed with minimum of the following configuration
| Parameter | description |
|-|-|
|MONGOURL | Connection string to the mongodb |
|QUEUECONNECTION | Service bus connection to azure|

To run the integration test, use the command:

`npm run test:integration`


## Message type definitions for each stage

| Message Type | Service | Description | Posted to (Topic) |
|-|-|-|-|
| gtfs-flex-upload | Flex data service | When flex file is uploaded to using /api/v1/gtfs-flex post service | gtfs-flex-upload |
| gtfs-flex-validation | Flex validation service | When flex file is validated by the service | gtfs-flex-validation |
| flex-data-service | Flex data service | When flex file validation is done and info saved | gtfs-flex-data-service|
| gtfs-pathways-upload | Pathways data service | When pathways file is uploaded to using /api/v1/gtfs-pathways post service | gtfs-pathways-upload |
| gtfs-pathways-validation | Pathways validation service | When pathways file is validated by the service | gtfs-pathways-validation |
| gtfs-pathways-data-service | Pathways data service | When pathways file validation is done and info saved | gtfs-pathways-data-service|
| osw-upload | OSW data service | When OSW file is uploaded to using /api/v1/osw post service | osw-upload |
| osw-validation | OSW validation service | When osw file is validated by the service | osw-validation |
| osw-format-result | OSW formatter service | When osw file is converted to multiple | osw-formatting-service|
| osw-data-service | OSW data service | When osw file validation is done and conversion complete | osw-data-service|


### Message types for alternative flows

1. Confidence metric calculation flow for osw
2. Formatter flow for osw
