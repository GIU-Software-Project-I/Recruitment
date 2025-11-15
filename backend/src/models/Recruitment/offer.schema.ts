import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OfferDocument = Offer & Document;

@Schema({ timestamps: true })
export class Offer {
  @Prop({ type: Types.ObjectId, ref: 'Application', required: true })
  application!: Types.ObjectId;

  @Prop()
  salary?: number;

  @Prop()
  currency?: string;

  @Prop()
  startDate?: Date;

  @Prop({ default: 'pending' })
  status?: 'pending' | 'accepted' | 'rejected' | 'withdrawn';

  @Prop({ default: '' })
  terms?: string; // free text for clauses or template id reference

  @Prop({ type: Types.ObjectId, ref: 'User' })
  issuedBy?: Types.ObjectId;

  @Prop([{ action: String, by: Types.ObjectId, at: Date, note: String }])
  audit?: { action: string; by?: Types.ObjectId; at: Date; note?: string }[];
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
