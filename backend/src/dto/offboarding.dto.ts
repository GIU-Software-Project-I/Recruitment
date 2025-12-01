import { Types } from 'mongoose';
import { TerminationInitiation } from '../enums/termination-initiation.enum';
import { TerminationStatus } from '../enums/termination-status.enum';
import { ApprovalStatus } from '../enums/approval-status.enum';

// ============================================
// OFF-018, OFF-019: Employee Resignation Request
// ============================================
export class SubmitResignationDto {
  employeeId: Types.ObjectId;
  reason: string;
  employeeComments?: string;
  contractId: Types.ObjectId;
}

export class TrackResignationStatusDto {
  employeeId: Types.ObjectId;
}

// ============================================
// OFF-001: HR Initiates Termination Review
// ============================================
export class InitiateTerminationDto {
  employeeId: Types.ObjectId;
  reason: string;
  hrComments?: string;
  contractId: Types.ObjectId;
  // TODO: Link to Performance Management warnings/scores
  performanceDataReference?: string;
}

// ============================================
// OFF-006: Offboarding Checklist (Asset Recovery)
// ============================================
export class CreateOffboardingChecklistDto {
  terminationId: Types.ObjectId;
  equipmentList: EquipmentItemDto[];
  accessCardIssued: boolean;
}

export class EquipmentItemDto {
  equipmentId?: Types.ObjectId;
  name: string;
  returned: boolean;
  condition?: string;
}

// ============================================
// OFF-010: Multi-Department Clearance Sign-offs
// ============================================
export class CreateClearanceChecklistDto {
  terminationId: Types.ObjectId;
  departments: string[]; // IT, Finance, Facilities, LineManager, HR
}

export class UpdateClearanceSignOffDto {
  terminationId: Types.ObjectId;
  department: string;
  status: ApprovalStatus;
  comments?: string;
  updatedBy: Types.ObjectId;
}

export class GetClearanceStatusDto {
  terminationId: Types.ObjectId;
}

// ============================================
// OFF-007: System Access Revocation
// ============================================
export class RevokeSystemAccessDto {
  employeeId: Types.ObjectId;
  terminationId: Types.ObjectId;
  systems: string[]; // All systems to revoke
  // TODO: Interface with IT/Access Systems
}

// ============================================
// OFF-013: Final Settlement and Benefits Termination
// ============================================
export class TriggerFinalSettlementDto {
  employeeId: Types.ObjectId;
  terminationId: Types.ObjectId;
  lastWorkingDay: Date;
  // TODO: Interface with Leaves Module for balance
  // TODO: Interface with Employee Profile for benefits
  // TODO: Interface with Payroll Module
}

// ============================================
// Update Termination Status
// ============================================
export class UpdateTerminationStatusDto {
  terminationId: Types.ObjectId;
  status: TerminationStatus;
  terminationDate?: Date;
  hrComments?: string;
}

// ============================================
// Equipment Return Tracking
// ============================================
export class UpdateEquipmentReturnDto {
  terminationId: Types.ObjectId;
  equipmentId: Types.ObjectId;
  returned: boolean;
  condition?: string;
}

export class UpdateAccessCardReturnDto {
  terminationId: Types.ObjectId;
  returned: boolean;
}

