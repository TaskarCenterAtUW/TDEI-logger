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

This is a single API with no authorization rules. This API is responsible for sending in the status of an uploaded file
and the history of actions/validations that happened to it.
