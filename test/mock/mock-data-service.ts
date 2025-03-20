/**
 * Class that mocks the dataservice.
 * This is used to get the responses from status controller
 */

import { DatabaseService } from "../../src/services/database.service";
import Record from '../../src/models/record';
import { QueueMessage } from "nodets-ms-core/lib/core/queue";

export class MockDataService extends DatabaseService {
    getStatus(recordId: string): Promise<Record> {
        return Promise.resolve(Record.from({
            tdeiRecordId:recordId,
            stage:'test-validation',
            status:'true'
        }))
    }
    processMessage(msg: QueueMessage): void {
        // Empty implementation
    }
}