// final-settlement.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

/**
 * FinalSettlement (FinalSettlementRecord)
 * - Stores summary and details of the employee's final pay, deductions and benefits termination (OFF-013).
 * - BR: BR 9, BR 11 (Leaves balance review and benefits termination)
 *
 * Notes:
 * - Kept as separate collection for auditability and to simplify payroll integration.
 * - Settlement records may be consumed by Payroll Module to produce a final payslip or encashment.
 */

export type FinalSettlementDocument = FinalSettlement & Document & { _id: Types.ObjectId };

export enum SettlementStatus {
  DRAFT = 'draft',
  PENDING_APPROVAL = 'pending_approval',
  APPROVED = 'approved',
  PROCESSED = 'processed',
  REJECTED = 'rejected',
}

@Schema({ timestamps: true })
export class FinalSettlement {
  @Prop({ type: Types.ObjectId, ref: 'OffboardingRequest', required: true })
  /* why: Link to the initiating request to maintain full traceability (OFF-013).
     type justification: ObjectId reference.
     service note: Payroll services will find settlements by offboardingRequestId. */
    offboardingRequestId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  /* why: Employee identification (for payroll, benefits termination).
     type justification: ObjectId reference.
     service note: Populate to get salary/bank data. */
   employeeId!: Types.ObjectId;

  @Prop({ type: Number, required: true })
  /* why: Gross final payouts (sum before deductions).
     type justification: Number for currency amounts (monetary fields should be stored as smallest unit or decimal depending on system; here Number is used — if precision needed, use Decimal128).
     service note: Use consistent currency conventions across system. */
   grossAmount!: number;

  @Prop({ type: Number, required: true })
  /* why: Sum of deductions applicable (loans, penalties).
     type justification: Number.
     service note: Calculated by services; kept for audit. */
   totalDeductions!: number;

  @Prop({ type: Number, required: true })
  /* why: Net payable amount after deductions (used by Payroll integration).
     type justification: Number.
     service note: Primary value consumed by payroll execution. */
   netPayable!: number;

  @Prop({
    type: [
      {
        code: { type: String, required: true }, // e.g., "UNUSED_ANNUAL_ENCASHMENT"
        description: { type: String, required: false },
        amount: { type: Number, required: true },
      },
    ],
    default: [],
  })
  /* why: Breakdown of settlement line-items (BR 9: unused leave encashment, loans, severance).
     type justification: Embedded array for snapshot and audit.
     service note: Used to generate detailed settlement lines for payslip. */
   breakdown!: {
    code: string;
    description?: string;
    amount: number;
  }[];

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  /* why: HR actor who prepared the settlement.
     type justification: ObjectId ref for accountability.
     service note: Displayed in approvals and audit exports. */
   preparedBy!: Types.ObjectId;

  @Prop({ enum: SettlementStatus, default: SettlementStatus.DRAFT })
  /* why: Status of settlement lifecycle (preparation -> approval -> processed).
     type justification: enum for step handling in controllers.
     service note: Payroll triggers only when status is APPROVED. */
   status!: SettlementStatus;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  /* why: Approver (Finance / HR) who signed off on settlement.
     type justification: ObjectId ref.
     service note: Required before marking settlement for payroll. */
  approvedBy?: Types.ObjectId;

  @Prop({ type: Date })
  /* why: Timestamp of approval.
     type justification: Date.
     service note: Helpful to decide payroll period eligibility. */
  approvedAt?: Date;

  @Prop({ type: String, required: false })
  /* why: Notes about settlement calculations, rounding rules or exceptions.
     type justification: string.
     service note: Included in exports to Payroll Module. */
  notes?: string;

  @Prop({ type: Boolean, default: false })
  /* why: Indicates whether benefits termination notification has been sent (OFF-013).
     type justification: boolean.
     service note: Ensures idempotency of notifications to benefits subsystem. */
   benefitsNotified!: boolean;
}

export const FinalSettlementSchema = SchemaFactory.createForClass(FinalSettlement);