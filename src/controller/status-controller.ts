import { IController } from "./interface/IController";
import express, { Request } from "express";
import { DatabaseService } from "../services/database.service";
import HttpException from "../exceptions/http/http-base-exception";
import { RecordResponse } from "../models/record-response";
import Record from "../models/record";

export class StatusController implements IController{
    public path = '/status';
    public router = express.Router();
    private databaseService: DatabaseService;

    constructor(dbService:DatabaseService) {
        this.intializeRoutes();
        this.databaseService = dbService;
    }

    public intializeRoutes() {
        this.router.get(`${this.path}`, this.getStatus);
    }

    getStatus = async (request: Request, response: express.Response) => {

        const recordId = request.query.tdeiRecordId as string;
        console.log('Record Id');
        console.log(recordId);
        try {
        if(recordId != ""){
            var record = await this.databaseService.getStatus(recordId);
                
            response.send(Record.recordToResponse(record));
        }
        else {
             // return loaded posts
            response.status(404).send("Record Id is empty");
        }
    } catch(e){
        if(e instanceof HttpException){
            response.status(e.status).send(e.message);
        }
        else {
            response.send(e);
        }
    } 
       
    }


}

// const statusController = new StatusController();
// export default statusController;