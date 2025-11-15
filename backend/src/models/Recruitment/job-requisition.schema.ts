import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  HydratedDocument, Types } from 'mongoose';

export type JobRequisitionDocument = HydratedDocument<JobRequisition>

@Schema({ timestamps: true })
export class JobRequisition {
  @Prop({ required: true })
  title!: string;

  @Prop({ type: Types.ObjectId, ref: 'Department', required: true })
  department!: Types.ObjectId;

  @Prop()
  location?: string;

  @Prop({ default: 1 })
  openings!: number;

  @Prop([String])
  qualifications?: string[];

  @Prop([String])
  skills?: string[];

  @Prop({ default: '' })
  description?: string;

  @Prop({ enum: ['draft', 'published', 'closed'], default: 'draft' })
  status!: 'draft' | 'published' | 'closed';

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'HiringProcessTemplate' })
  hiringProcessTemplate?: Types.ObjectId;
}

export const JobRequisitionSchema = SchemaFactory.createForClass(JobRequisition);
