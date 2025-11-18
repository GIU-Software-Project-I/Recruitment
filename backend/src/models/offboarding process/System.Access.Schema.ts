import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {AccessRevocation} from "./Access-Revocation.Schema";

@Schema({ _id: false })
export class SystemAccess {
    @Prop({type: String, required: true})
    systemName?: string; // US: OFF-007 - Specific system/application

    @Prop({type: String, required: true})
    accessType?: string; // US: OFF-007 - Type of access (login, database, etc.)

    @Prop({type: Boolean, default: false})
    isRevoked?: boolean; // US: OFF-007 - Individual system revocation status

    @Prop({type: Date})
    revokedAt?: Date; // US: OFF-007 - When this specific access was revoked

    @Prop({type: String})
    notes?: string; // US: OFF-007 - Any system-specific revocation notes
}

export const SystemAccessSchema = SchemaFactory.createForClass(SystemAccess);