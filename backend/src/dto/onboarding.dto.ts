import { Types } from 'mongoose';
import { OnboardingTaskStatus } from '../enums/onboarding-task-status.enum';
import { DocumentType } from '../enums/document-type.enum';

// ============================================
// ONB-001: Create Onboarding Task Checklist
// ============================================
export class CreateOnboardingChecklistDto {
  employeeId: Types.ObjectId;
  contractId: Types.ObjectId;
  tasks: OnboardingTaskDto[];
}

export class OnboardingTaskDto {
  name: string;
  department: string;
  status?: OnboardingTaskStatus;
  deadline?: Date;
  notes?: string;
}

// ============================================
// ONB-002: Access Signed Contract Details
// ============================================
export class AccessContractDetailsDto {
  contractId: Types.ObjectId;
}

export class CreateEmployeeProfileDto {
  contractId: Types.ObjectId;
  // TODO: Define employee profile fields from Employee Profile subsystem
  // This will be populated from contract details
}

// ============================================
// ONB-004: View Onboarding Tracker
// ============================================
export class GetOnboardingTrackerDto {
  employeeId: Types.ObjectId;
}

// ============================================
// ONB-005: Notifications (handled by Notifications Module)
// ============================================
export class OnboardingNotificationDto {
  employeeId: Types.ObjectId;
  taskName: string;
  deadline: Date;
}

// ============================================
// ONB-007: Upload Compliance Documents
// ============================================
export class UploadDocumentDto {
  employeeId: Types.ObjectId;
  type: DocumentType;
  filePath: string;
}

// ============================================
// ONB-009: Provision System Access
// ============================================
export class ProvisionSystemAccessDto {
  employeeId: Types.ObjectId;
  systems: string[]; // e.g., ['payroll', 'email', 'internal_portal']
}

// ============================================
// ONB-012: Reserve Equipment and Resources
// ============================================
export class ReserveEquipmentDto {
  employeeId: Types.ObjectId;
  equipment: EquipmentItemDto[];
  deskNumber?: string;
  accessCardNumber?: string;
}

export class EquipmentItemDto {
  name: string;
  type: string; // laptop, monitor, phone, etc.
  serialNumber?: string;
}

// ============================================
// ONB-013: Automated Account Provisioning
// ============================================
export class ScheduleAccountProvisioningDto {
  employeeId: Types.ObjectId;
  startDate: Date;
  exitDate?: Date;
  accounts: string[]; // SSO, email, tools
}

// ============================================
// ONB-018: Payroll Initiation
// ============================================
export class InitiatePayrollDto {
  employeeId: Types.ObjectId;
  contractId: Types.ObjectId;
  startDate: Date;
  // TODO: Interface with Payroll Module (PY)
}

// ============================================
// ONB-019: Signing Bonus Processing
// ============================================
export class ProcessSigningBonusDto {
  employeeId: Types.ObjectId;
  contractId: Types.ObjectId;
  bonusAmount: number;
  // TODO: Interface with Payroll Module (PY)
}

// ============================================
// Update Task Status
// ============================================
export class UpdateOnboardingTaskDto {
  onboardingId: Types.ObjectId;
  taskName: string;
  status: OnboardingTaskStatus;
  notes?: string;
  documentId?: Types.ObjectId;
}

// ============================================
// Candidate Initiates Onboarding
// ============================================
export class InitiateOnboardingDto {
  candidateId: Types.ObjectId;
  contractId: Types.ObjectId;
  signedContractPath: string;
  requiredForms: UploadedFormDto[];
  requiredTemplates: UploadedTemplateDto[];
}

export class UploadedFormDto {
  formName: string;
  filePath: string;
  uploadedAt: Date;
}

export class UploadedTemplateDto {
  templateName: string;
  filePath: string;
  uploadedAt: Date;
}

