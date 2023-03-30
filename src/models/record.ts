import { ObjectId } from "mongodb";
import { Queue, QueueMessage } from "nodets-ms-core/lib/core/queue";
import { AbstractDomainEntity, Prop } from "nodets-ms-core/lib/models";
import { QueueMessageContent } from "./messages/queue-message-content";
import { RecordResponse } from "./record-response";
import { ReportResponse } from "./report-response";

export default class Record extends AbstractDomainEntity {
    // constructor(public name: string, public price: number, public category: string, public id?: ObjectId) {}
    @Prop()
    tdeiRecordId!:string;

    @Prop()
    userId!:string;

    @Prop()
    id?:ObjectId;

    @Prop()
    tdeiOrgId!:string;

    @Prop()
    type!:string;

    @Prop()
    stage!:string;

    @Prop()
    createdAt!:Date;

    @Prop()
    lastUpdatedAt!:Date;

    @Prop()
    status!:string;

    @Prop()
    statusMessage?:string;

    @Prop()
    history:QueueMessage[] = []


   static generateRecord(msg:QueueMessage) : Record {

        var theRecord = new Record();
        theRecord.lastUpdatedAt = msg.publishedDate;
        const content:QueueMessageContent = QueueMessageContent.from(msg.data);
        theRecord.stage =  content.stage;
        theRecord.tdeiOrgId = content.orgId;
        theRecord.userId = content.userId;
        theRecord.history.push(msg);
        theRecord.status = content.response.success.toString();
        theRecord.statusMessage = content.response.message;
        theRecord.tdeiRecordId = content.tdeiRecordId;
        return theRecord;
    }

    updateRecord(msg:QueueMessage) {
        const content:QueueMessageContent = QueueMessageContent.from(msg.data);
        this.stage = content.stage;
        this.lastUpdatedAt = msg.publishedDate;
        this.status = content.response.success.toString();
        this.statusMessage = content.response.message;
        this.history.push(msg);
    }

    static recordToResponse(record: Record):RecordResponse {
        var recordResponse = RecordResponse.from(record);
        
        // record.history.sort((a,b)=>a.publishedDate.getTime() - b.publishedDate.getTime());
        if(record.history[0]){
            const message = record.history[0];
            const content = QueueMessageContent.from(message.data);
            const uploadPath = content.meta.file_upload_path;
            recordResponse.filePath = uploadPath;

        }
        return recordResponse;
    }

    static recordToReport(record: Record): ReportResponse {
        var recordResponse = ReportResponse.from(record);
        if(record.history[0]){
            const message = record.history[0];
            const content = QueueMessageContent.from(message.data);
            const uploadPath = content.meta.file_upload_path;
            recordResponse.filePath = uploadPath;

        }
        if(record.status !== "true"){
            // something failed
            recordResponse.stage = record.stage + " failed";
            recordResponse.isComplete = true;
            recordResponse.status  = record.statusMessage ?? "";
            return recordResponse;
        }

        recordResponse.isComplete = Record.isProcessingComplete(record);
        if(recordResponse.isComplete){
            recordResponse.status = "Processing complete";
        }
        else{
            // Need to give out the correct stage.
            recordResponse.status = "Pending with "+ Record.nextStage(record);
        }
         
        return recordResponse;
    }

    static nextStage(record:Record):string {
        var stages = ["upload","validation","data-service"];
        record.history.forEach((message)=>{
                
            const content = QueueMessageContent.from(message.data);
            const historyStage = content.stage.toLocaleLowerCase();
            stages.forEach((singleStage)=>{
                if(historyStage.endsWith(singleStage)){
                    stages = stages.filter(item=>item!=singleStage);
                }
            })
        });
        if(stages.length == 0){
        return "";
        }
        else {
            return stages[0];
        }
    }

    static isProcessingComplete(record:Record):boolean {
        // Check for the stages
        const stages = ["upload","validation","data-service"];
        // get the history
        if(record.history.length < stages.length){
            return false;
        }
        else {
            // make sure all the fields are there.
            var count = 0;
            record.history.forEach((message)=>{
                
                const content = QueueMessageContent.from(message.data);
                console.log(content.stage);
                const stage = content.stage.toLowerCase();
                // Should be available for content to be procesesd.
                stages.forEach((singleStage)=>{
                    if(stage.endsWith(singleStage)){
                        count++;
                    }
                });
            });
            if(count === stages.length){
                return true;
            }

        }
        return false;
    }

}