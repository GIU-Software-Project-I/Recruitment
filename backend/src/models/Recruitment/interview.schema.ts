import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type InterviewDocument = HydratedDocument<Interview>

@Schema({ timestamps: true })
export class Interview {
  @Prop({ type: Types.ObjectId, ref: 'Application', required: true })
  application!: Types.ObjectId;

  @Prop()
  scheduledAt?: Date;

  @Prop()
  mode?: 'online' | 'in_person' | 'phone' | string;

  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  panelMembers?: Types.ObjectId[];

  @Prop([{ interviewer: Types.ObjectId, score: Number, comment: String }])
  feedback?: { interviewer: Types.ObjectId; score: number; comment: string }[];

  @Prop({ default: 'pending' })
  status?: 'pending' | 'completed' | 'cancelled';
}

export const InterviewSchema = SchemaFactory.createForClass(Interview);
