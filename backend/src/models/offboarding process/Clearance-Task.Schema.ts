import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Types} from "mongoose";
import {ClearanceTaskStatus} from "./Clearance-Checklist.Schema";

@Schema({ _id: false })
export class ClearanceTask {

    @Prop({type:Types.ObjectId, required: true, ref: 'Department'})
    department?: Types.ObjectId // US: OFF-010 - IT, Finance, Facilities, Line Manager, HR, Admin


    @Prop({type: String, required: true})
    task?: string; // US: OFF-006 - Specific clearance item description

    @Prop({enum: ClearanceTaskStatus, default: ClearanceTaskStatus.PENDING})
    status?: ClearanceTaskStatus; // US: OFF-010 - Individual task status

    @Prop({type: String})
    notes?: string; // US: OFF-010 - Department-specific notes

    @Prop({type: Types.ObjectId, ref: 'Employee'})
    completedBy?: Types.ObjectId; // US: OFF-010 - Who from department completed

    @Prop({type: Date})
    completedAt?: Date; // US: OFF-010 - When task was completed

    @Prop({type: Boolean, default: false})
    isRequired?: boolean; // US: OFF-006 - Whether task is mandatory for completion

    @Prop({type: Number})
    sortOrder?: number; // Service need - For displaying tasks in specific order
}

export const ClearanceTaskSchema = SchemaFactory.createForClass(ClearanceTask);