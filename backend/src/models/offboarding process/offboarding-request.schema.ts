// offboarding-request.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

/**
 * OffboardingRequest
 * - Represents the initiation of a resignation or termination review.
 * - US: OFF-001 (HR-initiated termination review), OFF-018 (Employee resignation request), OFF-019 (track resignation status)
 * - BR: BR 4 (effective date + reason), BR 6 (resignation allowed)
 *
 * Notes:
 * - This is the primary record that starts the Offboarding workflows and links to ClearanceInstance(s), FinalSettlement, and AccessRevocation logs.
 * - Keeping a separate collection ensures auditability of the initiation event (vs. clearance/signoffs).
 */

export type OffboardingRequestDocument = OffboardingRequest & Document & { _id: Types.ObjectId };

export enum OffboardingType {
  RESIGNATION = 'resignation',
  TERMINATION = 'termination',
  RETIREMENT = 'retirement',
  CONTRACT_END = 'contract_end',
}

export enum OffboardingStatus {
  DRAFT = 'draft',
  PENDING_APPROVAL = 'pending_approval',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

@Schema({ timestamps: true })
export class OffboardingRequest {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'Employee',
  })
  /* why: Required to link request to the Employee Profile (Inputs needed: Employee Profile). (US: OFF-018, OFF-001)
     type justification: ObjectId reference allows population of employee details in services/controllers without duplicating data.
     service note: Used heavily when fetching employee data for workflows, payroll and clearance. */
  employeeId!: Types.ObjectId;

  @Prop({
    enum: OffboardingType,
    required: true,
  })
  /* why: Identifies if the request is resignation or termination etc (BR 4, BR 6).
     type justification: enum string for clarity and ease of querying (e.g., find all terminations).
     service note: Drives downstream workflow branching (different approvals for termination vs resignation). */
  type!: OffboardingType;

  @Prop({ required: true })
  /* why: Business rule BR 4 mandates a clearly stated reason for exit.
     type justification: string for free-text reason (could store a code in future if needed).
     service note: Exposed to reviewers and stored for audit. */
  reason!: string;

  @Prop({ type: Date, required: true })
  /* why: BR 4 requires an effective date for separation.
     type justification: Date datatype for accurate calculations (notice period, payroll cutoffs).
     service note: Used to calculate final settlement date, benefits termination date, and to trigger Payroll integration. */
  effectiveDate!: Date;

  @Prop({
    enum: OffboardingStatus,
    default: OffboardingStatus.PENDING_APPROVAL,
    required: true,
  })
  /* why: Must track the request lifecycle to support OFF-019 (employee tracking) and downstream flows.
     type justification: enum string simplifies state machine handling in services/controllers.
     service note: Services will update this status and may trigger notifications on change (N). */
  status!: OffboardingStatus;

  @Prop({
    type: [
      {
        actorId: { type: Types.ObjectId, ref: 'User' }, // person who performed action
        action: { type: String }, // e.g., 'submitted','escalated','approved','rejected'
        comment: { type: String },
        timestamp: { type: Date, default: () => new Date() },
      },
    ],
    default: [],
  })
  /* why: Audit trail for all actions on this request (BR 17: logging required).
     type justification: Embedded subdocuments provide fast append-only history tied to the request.
     service note: Useful for UI timeline, and for compliance/legal reporting. */
  auditTrail!: {
    actorId?: Types.ObjectId;
    action?: string;
    comment?: string;
    timestamp?: Date;
  }[];

  @Prop({
    type: Types.ObjectId,
    ref: 'ClearanceInstance',
    required: false,
  })
  /* why: Reference to the active ClearanceInstance (OFF-006, OFF-010) created after approval/initiation.
     type justification: ObjectId reference enables population and quick joins in service logic.
     service note: Services create ClearanceInstance and set this field; helps link request -> clearance -> settlement. */
  clearanceInstanceId?: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'FinalSettlement',
    required: false,
  })
  /* why: Links to FinalSettlementRecord that will be generated/triggered (OFF-013).
     type justification: ObjectId to keep settlement in separate collection for audit and payroll integration.
     service note: Payroll services will populate this when settlement is created. */
  finalSettlementId?: Types.ObjectId;

  @Prop({
    type: Boolean,
    default: false,
  })
  /* why: Quick boolean for whether notification to Payroll/Benefits has been fired (OFF-013).
     type justification: boolean for simple flag-checks in controllers.
     service note: Avoids duplicate triggers; simplifies idempotency in services. */
  payrollNotified!: boolean;

  @Prop({
    type: String,
    required: false,
  })
  /* why: Optional field to capture manager or HR comments during initiation.
     type justification: string for free-text.
     service note: Displayed in request view and included in audit exports. */
  initiatorComment?: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  /* why: Tracks who created/initiated the request (employee or HR actor).
     type justification: ObjectId ref to 'User' (system actor model) for accountability.
     service note: Used in permissions/notification logic. */
  createdBy!: Types.ObjectId;

  @Prop({
    type: Date,
    required: false,
  })
  /* why: Optional date when separation was completed (for lifecycle tracking).
     type justification: Date to calculate durations (time to clear, time to settle).
     service note: Set when clearance and settlement are completed and OFF process is closed. */
  completedAt?: Date;
}

export const OffboardingRequestSchema = SchemaFactory.createForClass(OffboardingRequest);