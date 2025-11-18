// access-revocation.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, HydratedDocument, Types} from 'mongoose';
import {FinalSettlementStatus} from "./final-settlement.schema";
import {SystemAccess} from "./System.Access.Schema";


export type AccessRevocationDocument = HydratedDocument<AccessRevocation>;
export type FinalSettlementDocument = HydratedDocument<FinalSettlementStatus>;

@Schema({ _id: false })
export class AccessRevocation {

    @Prop({type: Boolean,default: false})
    isRevoked?: boolean; // US: OFF-007, BR: 3(c),19 - Whether access was revoked

    @Prop({type: Date})
    revokedAt?: Date; // US: OFF-007 - When access was revoked

    @Prop({type: Types.ObjectId, ref: 'HR'})
    revokedBy?: Types.ObjectId; // US: OFF-007 - System Admin who revoked

    //@Prop({type: [SystemAccess], default: []})
    systemAccess?: SystemAccess[]; // US: OFF-007 - Specific systems access revoked

    @Prop({type: [String], default: []})
    physicalAssets?: string[]; // US: OFF-006 - ID cards, keys, equipment recovered

    @Prop({type: String})
    revocationNotes?: string; // US: OFF-007 - Any notes about the revocation process

    @Prop({type: Boolean, default: false})
    auditLogged?: boolean; // BR: 19 - Whether revocation was logged in audit trail
}


export const AccessRevocationSchema = SchemaFactory.createForClass(AccessRevocation);