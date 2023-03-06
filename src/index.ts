import { environment } from "./environment/environment";
// import { GTFSFlexUpload, GTFSFlexUploadMessage } from "./models/messages/gtfs-flex-upload";
import { DatabaseService } from "./services/database.service";
// import { connectToDatabase } from "./services/database.service";


console.log('Hello');
console.log(environment.mongoDBURL);

import abc from './assets/gtfs-flex-upload.json';
import { QueueMessage } from "nodets-ms-core/lib/core/queue";
import { QueueMessageContent } from "./models/messages/queue-message-content";
import Record from "./models/record";
import { Core } from "nodets-ms-core";
import { ListenerService } from "./services/listener.service";
// var flexUploadMessage = GTFSFlexUploadMessage.from(abc);
// var flexUpload = GTFSFlexUpload.from(flexUploadMessage.data);
// console.log(flexUpload);
var queueMessage = QueueMessage.from(abc);
var queueContent = QueueMessageContent.from(queueMessage.data);
// console.log(queueContent);


Core.initialize();

const existingTopics = [
    'gtfs-flex-upload',
    'gtfs-flex-validation',
    'osw-upload',
    'osw-validation'
];





var dbService = new DatabaseService();
dbService.initialize().then((connected)=>{
    console.log('connected');
    // dbService.processMessage(queueMessage);
});

existingTopics.forEach(singleTopic => {
    var topic = Core.getTopic(singleTopic);
    topic.subscribe('data-logger',new ListenerService(dbService));
});

