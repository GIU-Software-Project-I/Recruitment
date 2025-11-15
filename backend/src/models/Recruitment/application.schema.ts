import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type ApplicationDocument = HydratedDocument<Application>

export enum ApplicationStatus {
  APPLIED = 'applied',
  SCREENING = 'screening',
  SHORTLISTED = 'shortlisted',
  INTERVIEW = 'interview',
  OFFER = 'offer',
  HIRED = 'hired',
  REJECTED = 'rejected'
}

@Schema({ timestamps: true })
export class Application {
  @Prop({ type: Types.ObjectId, ref: 'JobRequisition', required: true })
  job!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Candidate', required: false })
  candidate?: Types.ObjectId;

  @Prop()
  candidateName?: string;

  @Prop()
  candidateEmail?: string;

  @Prop({ enum: Object.values(ApplicationStatus), default: ApplicationStatus.APPLIED })
  status!: ApplicationStatus;

  // documents: resume, cover letter, certificates (store as references or meta)
  @Prop([{ filename: String, url: String, uploadedAt: Date }])
  documents?: { filename: string; url: string; uploadedAt: Date }[];

  // generic key/value for external references (e.g., ATS ids)
  @Prop({ default: {} })
  refs?: Record<string, any>;

  // history of status changes for audit and timeline
  @Prop([{ status: String, changedBy: Types.ObjectId, at: Date, note: String }])
  statusHistory?: { status: string; changedBy?: Types.ObjectId; at: Date; note?: string }[];

  @Prop({ default: false })
  isReferral?: boolean;

  @Prop({ default: null })
  referralSource?: string;

  @Prop({ default: false })
  consentGiven?: boolean; // for personal-data processing/background checks
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
