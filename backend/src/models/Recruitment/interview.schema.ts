import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type InterviewDocument = HydratedDocument<Interview>

@Schema({ timestamps: true })
export class Interview {
  // rec010: application reference being interviewed
  @Prop({ type: Types.ObjectId, ref: 'Application', required: true })
  application!: Types.ObjectId;

  // rec010: scheduled date/time for the interview
  @Prop()
  scheduledAt?: Date;

  // rec010: interview mode (online/in_person/phone)
  @Prop()
  mode?: 'online' | 'in_person' | 'phone' | string;

  // rec021: panel members participating in the interview
  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  panelMembers?: Types.ObjectId[];

  // rec011: feedback items and scores collected from interviewers
  @Prop([{ interviewer: Types.ObjectId, score: Number, comment: String }])
  feedback?: { interviewer: Types.ObjectId; score: number; comment: string }[];

  // rec010: interview status
  @Prop({ default: 'pending' })
  status?: 'pending' | 'completed' | 'cancelled';

  // rec010/rec021: optional physical location or meeting room
  @Prop()
  location?: string;

  // rec010: expected duration in minutes
  @Prop()
  durationMinutes?: number;

  // rec010: timezone of the scheduled interview
  @Prop({ default: 'UTC' })
  timezone?: string;

  // rec010/rec021: external calendar event id (for invites)
  @Prop()
  calendarEventId?: string;
}

export const InterviewSchema = SchemaFactory.createForClass(Interview);
