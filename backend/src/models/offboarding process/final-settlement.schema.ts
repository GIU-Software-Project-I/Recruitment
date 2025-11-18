// final-settlement.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, HydratedDocument, Types} from 'mongoose';

export type FinalSettlementDocument = HydratedDocument<FinalSettlement>;

export enum FinalSettlementStatus {
    PENDING='pending',
    CALCULATED='calculated',
    APPROVED='approved',
    PAID='paid',
    CANCELLED='cancelled',
}

@Schema({ _id: false })
export class FinalSettlement {
    @Prop({type: Boolean,default: false})
    isTriggered!: boolean; // US: OFF-013 - Whether settlement process was initiated

    @Prop({type: Date})
    triggeredAt?: Date; // US: OFF-013 - When settlement was triggered

    @Prop({type: Types.ObjectId, ref: 'HR'})
    triggeredBy?: Types.ObjectId; // US: OFF-013 - HR Manager who triggered

    @Prop({type: Number, default: 0})
    unusedLeaveDays?: number; // US: OFF-013, BR: 9,11 - Leave balance for encashment

    @Prop({type: Number, default: 0})
    leaveEncashmentAmount?: number; // US: OFF-013, BR: 9,11 - Calculated encashment

    @Prop({type: Number, default: 0})
    severancePay?: number; // BR: 11 - Termination benefits if applicable

    @Prop({type: Number, default: 0})
    outstandingLoans?: number; // BR: 11 - Any pending loan deductions

    @Prop({type: Number, default: 0})
    otherDeductions?: number; // BR: 11 - Additional deductions

    @Prop({type: Number, default: 0})
    finalPaymentAmount?: number; // US: OFF-013 - Total settlement amount

    @Prop({enum:FinalSettlementStatus , default: FinalSettlementStatus.PENDING})
    paymentStatus?: FinalSettlementStatus; // US: OFF-013 - Tracks payroll processing

    @Prop({type: Date})
    benefitsTerminationDate?: Date; // US: OFF-013, BR: 11 - When benefits end

    @Prop({type: String})
    payrollReference?: string; // Service need - Link to payroll system record

    @Prop({type: Date})
    paidAt?: Date; // US: OFF-013 - When final payment was made

    @Prop({type: String})
    paymentNotes?: string; // BR: 11 - Additional payment information
}

export const FinalSettlementSchema = SchemaFactory.createForClass(FinalSettlement);