import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type AssessmentTemplateDocument = HydratedDocument<AssessmentTemplate>

@Schema({ timestamps: true })
export class AssessmentTemplate {
  @Prop({ required: true })
  name!: string;

  @Prop([{ key: String, label: String, weight: Number }])
  criteria?: { key: string; label: string; weight: number }[];

  @Prop({ default: '' })
  notes?: string;
}

export const AssessmentTemplateSchema = SchemaFactory.createForClass(AssessmentTemplate);
