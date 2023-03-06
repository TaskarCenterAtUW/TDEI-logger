import { DatabaseService } from "./services/database.service";
import { environment } from './environment/environment';
import { Core } from "nodets-ms-core";
import { ListenerService } from "./services/listener.service";
import App from './app';
import dotenv from 'dotenv';
import healthController from './controller/health-controller';
import { StatusController } from "./controller/status-controller";

//Load environment variables
dotenv.config()


Core.initialize();


const topicNames = environment.eventTopics;
const allTopics = topicNames?.split(',');
console.log('Logger will listen to the following topics: ');
console.log(allTopics);




var dbService = new DatabaseService();
dbService.initialize().then((connected) => {
    console.log('connected');

    allTopics?.forEach(singleTopic => {
        var topic = Core.getTopic(singleTopic);
        topic.subscribe('data-logger', new ListenerService(dbService));
    });

}).catch((e)=>{
    console.error('Not connected to database');
    console.log(e);
});

// Initialize the app service after this.




const PORT: number = environment.appPort;

new App(
    [
        healthController,
        new StatusController(dbService)
    ],
    PORT,
).listen();