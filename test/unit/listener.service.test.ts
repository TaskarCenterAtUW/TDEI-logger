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
            const message = QueueMessage.from({messageId:'sample'});
            const processMessageSpy = jest.spyOn(mocDataService,'processMessage');
            // Act
            listener.onReceive(message);
            // Assert
            expect(processMessageSpy).toHaveBeenCalledTimes(1);
            expect(processMessageSpy).toHaveBeenCalledWith(message);

        })
    })
})