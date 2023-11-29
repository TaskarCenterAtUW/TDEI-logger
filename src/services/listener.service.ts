import { QueueMessage } from "nodets-ms-core/lib/core/queue";
import { ITopicSubscription } from "nodets-ms-core/lib/core/queue/abstracts/IMessage-topic";
import { DatabaseService } from "./database.service";

export class ListenerService implements ITopicSubscription {

    databaseService: DatabaseService;
    regularFlowTypes: string[] = ['gtfs-flex-upload','gtfs-flex-validation','flex-data-service']


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