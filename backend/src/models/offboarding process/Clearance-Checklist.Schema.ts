// clearance-checklist.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, HydratedDocument, Types} from 'mongoose';


export type ClearanceChecklistDocument = HydratedDocument<ClearanceChecklist>;

export enum ClearanceStatus {
    PENDING='pending',
    IN_PROGRESS='in_progress',
    COMPLETED='completed',
    BLOCKED='blocked',
}

export enum ClearanceTaskStatus {
    PENDING='pending',
    COMPLETED='completed',
    REJECTED='rejected',
    NOT_APPLICABLE='not_applicable',
}

@Schema({ _id: false })
export class ClearanceChecklist {
    // @Prop({type: [ClearanceTask], default: []})
    // tasks: ClearanceTask[]; // US: OFF-006, OFF-010 - Multi-department clearance items

    @Prop({ enum: ClearanceStatus, default: ClearanceStatus.PENDING})
    overallStatus?: ClearanceStatus; // US: OFF-010 - Tracks completion of all clearance tasks

    @Prop({type: Date})
    startedAt?: Date; // US: OFF-010 - When clearance process began

    @Prop({type: Date})
    completedAt?: Date; // US: OFF-010, BR: 13(b,c) - When all departments signed off

    @Prop({type: Types.ObjectId, ref: 'HR'})
    completedBy?: Types.ObjectId; // US: OFF-010 - HR Manager who verified completion

    @Prop({type: String})
    completionNotes?: string; // BR: 14 - Final approval notes
}



export const ClearanceChecklistSchema = SchemaFactory.createForClass(ClearanceChecklist);
