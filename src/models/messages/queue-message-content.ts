import { IsNotEmpty } from "class-validator";
import { AbstractDomainEntity, Prop } from "nodets-ms-core/lib/models";
import { Core } from "nodets-ms-core";

export class QueueMessageContent extends AbstractDomainEntity {
    @Prop()
    @IsNotEmpty()
    request!: any;
    @Prop("tdei_record_id")
    @IsNotEmpty()
    tdeiRecordId!: string;
    @Prop("user_id")
    @IsNotEmpty()
    userId!: string;
    @IsNotEmpty()
    @Prop("tdei_org_id")
    orgId!: string;
    @Prop()
    @IsNotEmpty()
    stage!: string;
    @Prop()
    @IsNotEmpty()
    response!: {
        success: boolean,
        message: string
    };
    @Prop()
    meta!: any;

}