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