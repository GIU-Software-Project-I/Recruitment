import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  HydratedDocument } from 'mongoose';

export type HiringProcessTemplateDocument = HydratedDocument<HiringProcessTemplate>

@Schema({ timestamps: true })
export class HiringProcessTemplate {
  @Prop({ required: true })
  name!: string;

  // ordered stages, e.g. ['screening','shortlist','interview','offer','hired']
  @Prop([String])
  stages!: string[];

  @Prop({ default: {} })
  metadata?: Record<string, any>;
}

export const HiringProcessTemplateSchema = SchemaFactory.createForClass(HiringProcessTemplate);
