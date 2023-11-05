/**
 * Tests for `status-controller.ts`
 * It has two paths 
 * - getStatus and
 * - getStageReport
 * Both will take tdeiRecord as parameter.
 */

import { getMockReq, getMockRes } from "@jest-mock/express"
// Need to mock the database service
import { StatusController } from "../../src/controller/status-controller";
import { MockDataService } from '../mock/mock-data-service';



describe('Status Controller Test', () => {
    const dataService = new MockDataService();
    describe('Get Status', () => {
        describe('Functional', () => {
            test('When requested with tdeiRecord, Expect a record to be sent', async () => {
                // Arrange
                const req = getMockReq({ query: { tdeiRecordId: 'abc' } });
                const { res, next } = getMockRes();
                const getStatusSpy = jest.spyOn(dataService, 'getStatus');
                const statusController = new StatusController(dataService);
                // Act
                await statusController.getStatus(req, res);
                // Assert
                expect(res.status).toHaveBeenCalledWith(200);
                expect(getStatusSpy).toHaveBeenCalledTimes(1);

            })
            test('When requested with empty recordId, Expect 404 error', async () => {
                // Arrange
                const req = getMockReq({ query: { tdeiRecordId: '' } });
                const { res, next } = getMockRes();
                const statusController = new StatusController(dataService);
                // Act
                await statusController.getStatus(req, res);
                // Assert
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.send).toHaveBeenCalledWith(expect.stringContaining("Record Id is empty"))

            })
        })
    })
    describe('Get Stage Report', ()=>{
        describe('Functional', ()=>{
            test('When requested with tdeiRecord, Expect record to be sent', async ()=>{
                    // Arrange 
                    const req = getMockReq({ query: { tdeiRecordId: 'abc' } });
                    const { res, next } = getMockRes();
                    const getStatusSpy = jest.spyOn(dataService, 'getStatus');
                    const statusController = new StatusController(dataService);
                    // Act
                    await statusController.getStageReport(req, res);
                    // Assert
                    expect(res.status).toHaveBeenCalledWith(200);
                    expect(getStatusSpy).toHaveBeenCalledTimes(1);
    

            })
            test('When requested with empty recordId, Expect 404 error', async () => {
                // Arrange
                const req = getMockReq({ query: { tdeiRecordId: '' } });
                const { res, next } = getMockRes();
                const statusController = new StatusController(dataService);
                // Act
                await statusController.getStageReport(req, res);
                // Assert
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.send).toHaveBeenCalledWith(expect.stringContaining("Record Id is empty"))

            })
        })
    })
})