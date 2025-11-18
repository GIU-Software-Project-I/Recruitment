// resignation-request.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, HydratedDocument, Types} from 'mongoose';

export enum ResignationRequestStatus {
    DRAFT = 'draft',
    SUBMITTED = 'submitted',
    UNDER_REVIEW = 'under_review',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    WITHDRAWN = 'withdrawn',
}

export type ResignationRequestDocument = HydratedDocument<ResignationRequest>;

@Schema({ timestamps: true })
export class ResignationRequest {

    @Prop({type: Types.ObjectId, ref: 'Employee', required: true, index: true})
    employee!: Types.ObjectId; // US: OFF-018 - Employee submitting resignation

    @Prop({type: String, required: true})
    reason!: string; // US: OFF-018, BR: 6 - Employee's resignation reason

    @Prop({type: Date, required: true})
    proposedLastWorkingDay?: Date; // US: OFF-018 - Employee's proposed end date

    @Prop({ enum:Object.values(ResignationRequestStatus), default: ResignationRequestStatus.DRAFT})
    status?: ResignationRequestStatus; // US: OFF-019 - Tracks resignation request status

    @Prop({type: Types.ObjectId, ref: 'HR'})
    reviewedBy?: Types.ObjectId; // BR: 6 - Line Manager/HR who reviewed

    @Prop({type: Date})
    reviewedAt?: Date; // BR: 6 - When review occurred

    @Prop({type: String})
    reviewNotes?: string; // BR: 6 - Manager/HR feedback on resignation

    @Prop({type: Types.ObjectId, ref: 'Offboarding'})
    linkedOffboarding?: Types.ObjectId; // Service need - Links to main offboarding process

    @Prop({type: Boolean, default: false})
    isWithdrawn?: boolean; // US: OFF-018 - Whether employee withdrew resignation

    @Prop({type: Date})
    withdrawnAt?: Date; // US: OFF-018 - When resignation was withdrawn
}

export const ResignationRequestSchema = SchemaFactory.createForClass(ResignationRequest);

// Index for querying active resignation requests
ResignationRequestSchema.index({ employee: 1, status: 1 });
ResignationRequestSchema.index({ status: 1, createdAt: -1 });