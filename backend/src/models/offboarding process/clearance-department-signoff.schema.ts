// clearance-department-signoff.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

/**
 * ClearanceDepartmentSignoff
 * - Optional separate collection to hold department sign-offs.
 * - US: OFF-010 (multi-department sign-offs).
 * - BR: BR 13(b,c)
 *
 * Notes:
 * - This schema is provided because high-volume scenarios or auditing requirements may make querying signoffs across many clearances more efficient if stored as a separate collection.
 * - In ClearanceInstance we included embedded signoffs; choose one approach in your deployment. If you keep both, maintain data consistency by writing to both (or use eventual consistency + reconcile job).
 */

export type ClearanceDepartmentSignoffDocument = ClearanceDepartmentSignoff & Document & { _id: Types.ObjectId };

export enum DepartmentSignoffStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Schema({ timestamps: true })
export class ClearanceDepartmentSignoff {
  @Prop({ type: Types.ObjectId, ref: 'ClearanceInstance', required: true })
  /* why: Link to the ClearanceInstance for audit and traceability (OFF-010).
     type justification: ObjectId reference allows joins and aggregate queries.
     service note: Query signoffs by clearanceInstanceId to reconstruct the clearance timeline. */
   clearanceInstanceId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Employee', required: true })
  /* why: Employee link for departmental dashboards (who is being cleared).
     type justification: ObjectId reference.
     service note: Useful for department views to show pending signoffs for employees. */
   employeeId!: Types.ObjectId;

  @Prop({ required: true })
  /* why: Department name (IT, Finance, Facilities, LineManager).
     type justification: string for simple queries.
     service note: Indexable for quick filtering (e.g., find all IT pending signoffs). */
   department!: string;

  @Prop({ enum: DepartmentSignoffStatus, default: DepartmentSignoffStatus.PENDING })
  /* why: Current state of sign-off (OFF-010).
     type justification: enum simplifies state handling.
     service note: Controllers will update this field and can notify HR upon approval. */
   signoffStatus!: DepartmentSignoffStatus;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  /* why: Person who approved or rejected.
     type justification: ObjectId reference.
     service note: Display signer info in audits. */
  signedBy?: Types.ObjectId;

  @Prop({ type: Date, required: false })
  /* why: Timestamp of sign-off action.
     type justification: Date.
     service note: Useful to compute time-to-clear metrics. */
  signedAt?: Date;

  @Prop({ type: String, required: false })
  /* why: Optional comment from department during sign-off.
     type justification: string.
     service note: Useful for exception handling and follow-up. */
  comment?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  /* why: The user who created this signoff record (usually system/HR when instance created).
     type justification: ObjectId ref.
     service note: For accountability. */
   createdBy!: Types.ObjectId;
}

export const ClearanceDepartmentSignoffSchema = SchemaFactory.createForClass(ClearanceDepartmentSignoff);