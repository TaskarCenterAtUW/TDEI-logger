import { QueueMessage } from "nodets-ms-core/lib/core/queue";
import { ITopicSubscription } from "nodets-ms-core/lib/core/queue/abstracts/IMessage-topic";
import { DatabaseService } from "./database.service";

export class ListenerService implements ITopicSubscription {

    databaseService: DatabaseService;

    constructor(dbService:DatabaseService) {
        this.databaseService = dbService;
    }

    onReceive(message: QueueMessage) {
        console.log('Received');
        this.databaseService.processMessage(message);
    }

    onError(error: Error) {
        console.log('Error');
        console.log(error);

    }
}