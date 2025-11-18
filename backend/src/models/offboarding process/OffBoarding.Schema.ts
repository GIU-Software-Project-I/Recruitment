// offboarding.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, HydratedDocument, Types} from 'mongoose';


export type OffboardingDocument = HydratedDocument<Offboarding>;

export enum OffboardingTypes {
    RESIGNATION='resignation',
    TERMINATION='termination',
    RETIREMENT='retirement',
    OTHER='other',
}

export enum OffboardingStatus{
    DRAFT='draft',
    PENDING_APPROVAL='pending_approval',
    APPROVED='approved',
    CLEARANCE_PENDING='clearance_pending',
    CLEARANCE_IN_PROGRESS='clearance_in_progress',
    CLEARANCE_COMPLETED='clearance_completed',
    FINAL_SETTLEMENT='final_settlement',
    COMPLETED='completed',
    CANCELLED='cancelled',
}

@Schema({ timestamps: true })
export class Offboarding {

    @Prop({type: Types.ObjectId,ref: 'Employee', required: true, index: true})
    employee!: Types.ObjectId; // US: OFF-018, OFF-001 - Links to employee being offboarded

    @Prop({type: Types.ObjectId, ref: 'User', required: true})
    initiatedBy!: Types.ObjectId; // US: OFF-001, OFF-018 - Who initiated the process

    @Prop({ enum: OffboardingTypes, required: true})
    type?: OffboardingTypes; // BR: 4,6 - Clear separation type with defined reason

    @Prop({type: String, required: true})
    reason?: string; // BR: 4 - Mandatory justification for exit

    @Prop({type: Date, required: true})
    effectiveDate?: Date; // BR: 4 - Official separation date

    @Prop({type: Date})
    resignationRequestDate?: Date; // US: OFF-018 - When employee submitted resignation

    @Prop({enum: OffboardingStatus, default: OffboardingStatus.DRAFT})
    status?: OffboardingStatus; // US: OFF-019, BR: 6 - Tracks workflow progression

    @Prop({type: Date})
    noticePeriodStart?: Date; // BR: 11 - Start of notice period for benefits calculation

    @Prop({type: Date})
    noticePeriodEnd?: Date; // BR: 11 - End of notice period

    @Prop({type: Boolean, default: false})
    isVoluntary?: boolean; // BR: 4,6 - Distinguishes resignation vs termination

    @Prop({type: [Types.ObjectId], ref: 'Performance'})
    performanceWarnings?: Types.ObjectId[]; // US: OFF-001 - Links to performance issues

    @Prop({type: String})
    managerNotes?: string; // US: OFF-001 - Additional context for termination

    @Prop({type: String})
    hrNotes?: string; // US: OFF-001 - HR review notes

    @Prop({type: Date})
    approvedAt?: Date; // US: OFF-019 - When offboarding was approved

    @Prop({type: Types.ObjectId, ref: 'HR'})
    approvedBy?: Types.ObjectId; // US: OFF-001 - Who approved the offboarding

    @Prop({type: Date})
    completedAt?: Date; // US: OFF-019 - When process was fully completed

    // // Embedded sub-documents for related data
    // @Prop({ type: ClearanceChecklist })
    // clearanceChecklist?: ClearanceChecklist; // US: OFF-006, OFF-010
    //
    // @Prop({ type: FinalSettlement })
    // finalSettlement?: FinalSettlement; // US: OFF-013
    //
    // @Prop({ type: AccessRevocation })
    // accessRevocation?: AccessRevocation; // US: OFF-007
    //
    // // Audit fields automatically added by timestamps: true
    // // createdAt, updatedAt
}

export const OffboardingSchema = SchemaFactory.createForClass(Offboarding);
