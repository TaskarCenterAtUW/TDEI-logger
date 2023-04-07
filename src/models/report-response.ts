import { AbstractDomainEntity, Prop } from "nodets-ms-core/lib/models";

export class ReportResponse extends AbstractDomainEntity{

    @Prop()
    tdeiRecordId!:string;

    @Prop()
    stage!:string;

    @Prop()
    isComplete:boolean = false;
    
    @Prop()
    status!:string;

}