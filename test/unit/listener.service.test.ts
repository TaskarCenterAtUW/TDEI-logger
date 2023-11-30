import { mock } from "node:test";
import { MockDataService } from "../mock/mock-data-service"
import {ListenerService} from '../../src/services/listener.service';
import { QueueMessage } from "nodets-ms-core/lib/core/queue";

/**
 * Unit testing for listener service.
 * There is only one method to be tested appropriately
 */
describe('Listener service', ()=>{
    describe('Functional', ()=>{
        const mocDataService = new MockDataService();

        test('When message is received, expect database to process that message', ()=>{
            // Arrange
            const listener = new ListenerService(mocDataService);
            const message = QueueMessage.from({messageId:'sample',messageType:'gtfs-flex-upload'});
            const processMessageSpy = jest.spyOn(mocDataService,'processMessage');
            // Act
            listener.onReceive(message);
            // Assert
            expect(processMessageSpy).toHaveBeenCalledTimes(1);
            expect(processMessageSpy).toHaveBeenCalledWith(message);

        })

        test('When confidence message is received, expect database to call processConfidence Message', ()=>{

             // Arrange
             const listener = new ListenerService(mocDataService);
             const message = QueueMessage.from({messageId:'sample',messageType:'osw-confidence-request',data:{'jobId':"4"}});
             const processMessageSpy = jest.spyOn(mocDataService,'processConfidenceMessage');
             // Act
             listener.onReceive(message);
             // Assert
             expect(processMessageSpy).toHaveBeenCalledTimes(1);
             expect(processMessageSpy).toHaveBeenCalledWith(message);

        })
    })
})