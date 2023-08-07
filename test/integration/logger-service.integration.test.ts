import { Core } from "nodets-ms-core";
import { environment } from "../../src/environment/environment"
import { DatabaseService } from "../../src/services/database.service";
import { ListenerService } from "../../src/services/listener.service";
import testMessage from '../test-data/upload-msg.json';
import { QueueMessage } from "nodets-ms-core/lib/core/queue";

require('dotenv').config();
const delay = (ms:number)=> new Promise(res=> setTimeout(res,ms));



describe('Data logger integration test',()=>{

    const tempSubscription = 'upload-validation-processor';
    const mockProcessFn = jest.fn();
    const mockDbService = new DatabaseService();

    afterAll((done)=>{
        done();
    })
    beforeAll(()=>{
        jest.clearAllMocks();
        environment.eventTopics = 'temp-upload';
        Core.initialize();
        jest.spyOn(mockDbService,'processMessage').mockImplementation((msg:QueueMessage)=>{
            console.log('heh');
            mockProcessFn();
            return;
        });

    })

    test('Expect to receive message from the list of topic', async ()=>{
        if(!process.env.QUEUECONNECTION) {
            console.error('QUEUECONNECTION environment not set');
            return;
        }
        expect(process.env.QUEUECONNECTION != undefined && process.env.QUEUECONNECTION != null).toBeTruthy();
        const allTopics = environment.eventTopics!.split(',');
        const listener = new ListenerService(mockDbService);
        const receiveFn = jest.spyOn(listener,'onReceive').mockImplementation();
        var topic = Core.getTopic(allTopics[0]);
        await topic.subscribe(tempSubscription,listener);

        // Act
        await topic.publish(QueueMessage.from(testMessage));
        await delay(6000);
        
        // Assert
        expect(receiveFn).toHaveBeenCalledTimes(1);


    },60000)

    test('Expect to have an active connection with database', async ()=>{

        const dbService =  new DatabaseService();
        const result = await dbService.initialize();
        expect(result).toBe(true);

    },15000)
})