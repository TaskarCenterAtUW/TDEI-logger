import { QueueMessage } from "nodets-ms-core/lib/core/queue";
import { AbstractDomainEntity, Prop } from "nodets-ms-core/lib/models";

// similar to record but is usable.
export class RecordResponse extends AbstractDomainEntity {

    @Prop()
    tdeiRecordId!:string;

    @Prop()
    userId!:string;

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

}