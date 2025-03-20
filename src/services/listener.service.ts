import { QueueMessage } from "nodets-ms-core/lib/core/queue";
import { ITopicSubscription } from "nodets-ms-core/lib/core/queue/abstracts/IMessage-topic";
import { DatabaseService } from "./database.service";

export class ListenerService implements ITopicSubscription {

    databaseService: DatabaseService;
    // Message types present in the regular file upload flow
    regularFlowTypes: string[] = ['gtfs-flex-upload','gtfs-flex-validation','flex-data-service',
                                    'gtfs-pathways-upload','gtfs-pathways-validation','gtfs-pathways-data-service',
                                'osw-upload','osw-validation','osw-format-result','osw-data-service']
    confidenceFlowTypes: string[] = ['osw-confidence-request','confidence-response']
    formatFlowTypes: string[] = ['osw-formatter-request','osw-formatter-response']


    constructor(dbService:DatabaseService) {
        this.databaseService = dbService;
    }

    onReceive(message: QueueMessage) {
        console.log('Received');
        console.log(message.messageType);
        const messageType = message.messageType;
        if(this.regularFlowTypes.includes(messageType)) {
            this.databaseService.processMessage(message);
        }
        else if(this.confidenceFlowTypes.includes(messageType)){
            console.log('Confidence request type');
            this.databaseService.processConfidenceMessage(message)

        }
        else if(this.formatFlowTypes.includes(messageType)){
            console.log('Data formatting type of request')
            this.databaseService.processFormatterMessage(message)
        }
        else {
            console.log('Unknown message type');
            console.log(message.messageType);
            console.log('message');
            console.log(message);
        }
    }

    onError(error: Error) {
        console.log('Error');
        console.log(error);

    }
}