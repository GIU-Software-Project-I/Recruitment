import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TerminationRequest, TerminationRequestDocument } from '../models/termination-request.schema';
import { ClearanceChecklist, ClearanceChecklistDocument } from '../models/clearance-checklist.schema';

// ============================================================================
// TERMINATION PROVIDER (OFF-001)
// ============================================================================
import { CreateTerminationDto } from '../dto/offboarding/create-termination.dto';
import { UpdateTerminationStatusDto } from '../dto/offboarding/update-termination-status.dto';
import { TerminationStatus } from '../enums/termination-status.enum';
import { TerminationApprovalPayloadDto } from '../dto/offboarding/payloads.dto';

class TerminationProvider {
  constructor(private terminationModel: Model<TerminationRequestDocument>) {}

  async createTerminationReview(dto: CreateTerminationDto): Promise<TerminationRequestDocument> {
    const termination = new this.terminationModel({
      employeeId: new Types.ObjectId(dto.employeeId),
      initiator: dto.initiator,
      reason: dto.reason,
      hrComments: dto.hrComments || (dto.performanceDataId
        ? `Performance data reference: ${dto.performanceDataId}`
        : undefined),
      status: TerminationStatus.UNDER_REVIEW,
      terminationDate: new Date(dto.terminationDate),
      contractId: new Types.ObjectId(dto.contractId),
    });

    return await termination.save();
  }

  async updateTerminationStatus(terminationId: string, dto: UpdateTerminationStatusDto): Promise<TerminationRequestDocument> {
    const termination = await this.getTerminationById(terminationId);

    this.validateStatusTransition(termination.status, dto.status);
    termination.status = dto.status;

    if (dto.hrComments) {
      termination.hrComments = dto.hrComments;
    }

    return await termination.save();
  }

  async getTerminationById(terminationId: string): Promise<TerminationRequestDocument> {
    const termination = await this.terminationModel.findById(terminationId);

    if (!termination) {
      throw new NotFoundException('Termination request not found');
    }

    return termination;
  }

  async getAllTerminations(filters?: { status?: TerminationStatus; employeeId?: string }): Promise<TerminationRequestDocument[]> {
    const query: any = {};

    if (filters?.status) {
      query.status = filters.status;
    }

    if (filters?.employeeId) {
      query.employeeId = new Types.ObjectId(filters.employeeId);
    }

    return await this.terminationModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async getTerminationApprovalPayload(terminationId: string): Promise<TerminationApprovalPayloadDto> {
    const termination = await this.getTerminationById(terminationId);

    return {
      employeeId: termination.employeeId.toString(),
      contractId: termination.contractId.toString(),
      status: termination.status,
      terminationDate: termination.terminationDate || new Date(),
      reason: termination.reason,
    };
  }

  private validateStatusTransition(currentStatus: TerminationStatus, newStatus: TerminationStatus): void {
    const validTransitions: Record<TerminationStatus, TerminationStatus[]> = {
      [TerminationStatus.PENDING]: [TerminationStatus.UNDER_REVIEW, TerminationStatus.REJECTED],
      [TerminationStatus.UNDER_REVIEW]: [TerminationStatus.APPROVED, TerminationStatus.REJECTED],
      [TerminationStatus.APPROVED]: [],
      [TerminationStatus.REJECTED]: [],
    };

    if (!validTransitions[currentStatus].includes(newStatus)) {
      throw new BadRequestException(
        `Invalid status transition from ${currentStatus} to ${newStatus}`,
      );
    }
  }
}

// ============================================================================
// RESIGNATION PROVIDER (OFF-018, OFF-019)
// ============================================================================
import { CreateResignationDto } from '../dto/offboarding/create-resignation.dto';
import { TerminationInitiation } from '../enums/termination-initiation.enum';

class ResignationProvider {
  constructor(private terminationModel: Model<TerminationRequestDocument>) {}

  async createResignationRequest(dto: CreateResignationDto): Promise<TerminationRequestDocument> {
    const resignation = new this.terminationModel({
      employeeId: new Types.ObjectId(dto.employeeId),
      initiator: TerminationInitiation.EMPLOYEE,
      reason: dto.reason,
      employeeComments: dto.employeeComments,
      status: TerminationStatus.PENDING,
      terminationDate: new Date(dto.terminationDate),
      contractId: new Types.ObjectId(dto.contractId),
    });

    return await resignation.save();
  }

  async getResignationStatus(employeeId: string): Promise<TerminationRequestDocument | null> {
    const resignation = await this.terminationModel
      .findOne({
        employeeId: new Types.ObjectId(employeeId),
        initiator: TerminationInitiation.EMPLOYEE,
      })
      .sort({ createdAt: -1 })
      .exec();

    if (!resignation) {
      throw new NotFoundException(`No resignation found for employee ${employeeId}`);
    }

    return resignation;
  }

  async getAllResignations(filters?: { status?: TerminationStatus }): Promise<TerminationRequestDocument[]> {
    const query: any = {
      initiator: TerminationInitiation.EMPLOYEE,
    };

    if (filters?.status) {
      query.status = filters.status;
    }

    return await this.terminationModel.find(query).sort({ createdAt: -1 }).exec();
  }
}

// ============================================================================
// CLEARANCE PROVIDER (OFF-006, OFF-010)
// ============================================================================
import { ClearanceItemUpdateDto } from '../dto/offboarding/clearance-item-update.dto';
import { AddEquipmentDto } from '../dto/offboarding/add-equipment.dto';
import { MarkEquipmentReturnedDto } from '../dto/offboarding/mark-equipment-returned.dto';
import { ApprovalStatus } from '../enums/approval-status.enum';
import { ClearanceStatusPayloadDto } from '../dto/offboarding/payloads.dto';

class ClearanceProvider {
  constructor(
    private terminationModel: Model<TerminationRequestDocument>,
    private clearanceModel: Model<ClearanceChecklistDocument>,
  ) {}

  async createClearanceChecklist(terminationId: string): Promise<ClearanceChecklistDocument> {
    const termination = await this.terminationModel.findById(terminationId);
    if (!termination) {
      throw new NotFoundException('Termination request not found');
    }

    const existing = await this.clearanceModel.findOne({
      terminationId: new Types.ObjectId(terminationId),
    });

    if (existing) {
      throw new BadRequestException('Clearance checklist already exists for this termination');
    }

    const departments = ['IT', 'Finance', 'Facilities', 'HR', 'Admin'];

    const clearance = new this.clearanceModel({
      terminationId: new Types.ObjectId(terminationId),
      items: departments.map((dept) => ({
        department: dept,
        status: ApprovalStatus.PENDING,
        comments: '',
        updatedBy: null,
        updatedAt: null,
      })),
      equipmentList: [],
      cardReturned: false,
    });

    return await clearance.save();
  }

  async updateClearanceItem(clearanceId: string, dto: ClearanceItemUpdateDto): Promise<ClearanceChecklistDocument> {
    const clearance = await this.clearanceModel.findById(clearanceId);

    if (!clearance) {
      throw new NotFoundException('Clearance checklist not found');
    }

    const itemIndex = clearance.items.findIndex((item) => item.department === dto.department);

    if (itemIndex === -1) {
      throw new NotFoundException(`Department ${dto.department} not found in checklist`);
    }

    clearance.items[itemIndex].status = dto.status;
    clearance.items[itemIndex].comments = dto.comments || clearance.items[itemIndex].comments;
    clearance.items[itemIndex].updatedBy = dto.updatedBy
      ? new Types.ObjectId(dto.updatedBy)
      : clearance.items[itemIndex].updatedBy;
    clearance.items[itemIndex].updatedAt = new Date();

    return await clearance.save();
  }

  async getClearanceByTerminationId(terminationId: string): Promise<ClearanceChecklistDocument | null> {
    const clearance = await this.clearanceModel.findOne({ terminationId: new Types.ObjectId(terminationId) }).exec();

    if (!clearance) {
      throw new NotFoundException('Clearance checklist not found for this termination');
    }

    return clearance;
  }

  async addEquipmentToChecklist(clearanceId: string, dto: AddEquipmentDto): Promise<ClearanceChecklistDocument> {
    const clearance = await this.clearanceModel.findById(clearanceId);

    if (!clearance) {
      throw new NotFoundException('Clearance checklist not found');
    }

    clearance.equipmentList.push({
      equipmentId: new Types.ObjectId(dto.equipmentId),
      name: dto.name,
      returned: false,
      condition: null,
    });

    return await clearance.save();
  }

  async markEquipmentReturned(clearanceId: string, equipmentId: string, dto: MarkEquipmentReturnedDto): Promise<ClearanceChecklistDocument> {
    const clearance = await this.clearanceModel.findById(clearanceId);

    if (!clearance) {
      throw new NotFoundException('Clearance checklist not found');
    }

    const equipmentIndex = clearance.equipmentList.findIndex(
      (item) => item.equipmentId.toString() === equipmentId,
    );

    if (equipmentIndex === -1) {
      throw new NotFoundException('Equipment not found in checklist');
    }

    clearance.equipmentList[equipmentIndex].returned = dto.returned;
    clearance.equipmentList[equipmentIndex].condition = dto.condition || null;

    return await clearance.save();
  }

  async updateCardReturnedStatus(clearanceId: string, cardReturned: boolean): Promise<ClearanceChecklistDocument> {
    const clearance = await this.clearanceModel.findById(clearanceId);

    if (!clearance) {
      throw new NotFoundException('Clearance checklist not found');
    }

    clearance.cardReturned = cardReturned;
    return await clearance.save();
  }

  async getClearanceStatusPayload(terminationId: string): Promise<ClearanceStatusPayloadDto> {
    const clearance = await this.clearanceModel.findOne({ terminationId: new Types.ObjectId(terminationId) }).exec();

    if (!clearance) {
      return {
        terminationId,
        allDepartmentsCleared: false,
        pendingDepartments: ['IT', 'Finance', 'Facilities', 'HR', 'Admin'],
        clearedDate: undefined,
      };
    }

    const pendingDepartments = clearance.items.filter((item) => item.status !== ApprovalStatus.APPROVED)
      .map((item) => item.department);

    const allDepartmentsCleared = pendingDepartments.length === 0;

    return {
      terminationId,
      allDepartmentsCleared,
      pendingDepartments,
      clearedDate: allDepartmentsCleared ? new Date() : undefined,
    };
  }
}

// ============================================================================
// ACCESS REVOCATION PROVIDER (OFF-007)
// ============================================================================
import { RevokeAccessDto } from '../dto/offboarding/revoke-access.dto';
import { AccessRevocationPayloadDto } from '../dto/offboarding/payloads.dto';

class AccessRevocationProvider {
  constructor(
    private terminationModel: Model<TerminationRequestDocument>,
    private clearanceModel: Model<ClearanceChecklistDocument>,
  ) {}

  async logAccessRevocation(dto: RevokeAccessDto): Promise<AccessRevocationPayloadDto> {
    const termination = await this.terminationModel.findOne({ employeeId: new Types.ObjectId(dto.employeeId) }).sort({ createdAt: -1 }).exec();

    if (!termination) {
      throw new NotFoundException('No termination request found for this employee');
    }

    const clearance = await this.clearanceModel
      .findOne({ terminationId: termination._id })
      .exec();

    if (clearance) {
      const itIndex = clearance.items.findIndex((item) => item.department === 'IT');
      if (itIndex !== -1) {
        const revocationLog = `Access revoked: ${dto.accessTypes.join(', ')} at ${new Date().toISOString()} by ${dto.revokedBy}`;
        clearance.items[itIndex].comments = clearance.items[itIndex].comments
          ? `${clearance.items[itIndex].comments}\n${revocationLog}`
          : revocationLog;
        clearance.items[itIndex].updatedAt = new Date();
        await clearance.save();
      }
    }

    return {
      employeeId: dto.employeeId,
      revokedAt: new Date(),
      accessTypes: dto.accessTypes,
      revokedBy: dto.revokedBy,
      systemsToNotify: ['ActiveDirectory', 'VPN', 'AccessControl', 'ERP'],
    };
  }

  async getAccessRevocationHistory(employeeId: string): Promise<string[]> {
    const termination = await this.terminationModel.findOne({ employeeId: new Types.ObjectId(employeeId) }).sort({ createdAt: -1 }).exec();

    if (!termination) {
      return [];
    }

    const clearance = await this.clearanceModel.findOne({ terminationId: termination._id }).exec();

    if (!clearance) {
      return [];
    }

    const itItem = clearance.items.find((item) => item.department === 'IT');

    if (!itItem || !itItem.comments) {
      return [];
    }

    return itItem.comments
      .split('\n')
      .filter((line) => line.includes('Access revoked:'));
  }
}

// ============================================================================
// FINAL SETTLEMENT PROVIDER (OFF-013)
// ============================================================================
import { TriggerFinalSettlementDto } from '../dto/offboarding/trigger-final-settlement.dto';
import { FinalSettlementPayloadDto } from '../dto/offboarding/payloads.dto';

class FinalSettlementProvider {
  constructor(
    private terminationModel: Model<TerminationRequestDocument>,
    private clearanceModel: Model<ClearanceChecklistDocument>,
  ) {}

  async triggerFinalSettlement(dto: TriggerFinalSettlementDto): Promise<FinalSettlementPayloadDto> {
    const termination = await this.terminationModel.findById(dto.terminationId);

    if (!termination) {
      throw new NotFoundException('Termination request not found');
    }

    const clearance = await this.clearanceModel
      .findOne({ terminationId: new Types.ObjectId(dto.terminationId) })
      .exec();

    if (clearance) {
      const allCleared = clearance.items.every((item) => item.status === ApprovalStatus.APPROVED);
      if (!allCleared) {
        throw new BadRequestException('Cannot trigger final settlement - clearance not complete');
      }
    }

    return {
      employeeId: termination.employeeId.toString(),
      terminationId: dto.terminationId,
      terminationDate: termination.terminationDate || new Date(dto.effectiveDate),
      unusedLeaveBalance: dto.unusedLeaveBalance,
      benefitsTerminationDate: termination.terminationDate,
      deductionsToApply: 0,
    };
  }

  async canTriggerSettlement(terminationId: string): Promise<boolean> {
    const clearance = await this.clearanceModel
      .findOne({ terminationId: new Types.ObjectId(terminationId) })
      .exec();

    if (!clearance) {
      return false;
    }

    return clearance.items.every((item) => item.status === ApprovalStatus.APPROVED);
  }

  async getSettlementReadinessStatus(terminationId: string): Promise<{
    ready: boolean;
    pendingDepartments: string[];
    message: string;
  }> {
    const clearance = await this.clearanceModel
      .findOne({ terminationId: new Types.ObjectId(terminationId) })
      .exec();

    if (!clearance) {
      return {
        ready: false,
        pendingDepartments: ['IT', 'Finance', 'Facilities', 'HR', 'Admin'],
        message: 'Clearance checklist has not been created yet',
      };
    }

    const pendingDepartments = clearance.items
      .filter((item) => item.status !== ApprovalStatus.APPROVED)
      .map((item) => item.department);

    const ready = pendingDepartments.length === 0;

    return {
      ready,
      pendingDepartments,
      message: ready
        ? 'All clearances approved. Settlement can be triggered.'
        : `Pending clearances from: ${pendingDepartments.join(', ')}`,
    };
  }
}

// ============================================================================
// MAIN OFFBOARDING SERVICE
// ============================================================================

/**
 * Offboarding Service - Handles all offboarding operations
 * Delegates to specialized providers for each feature:
 * - TerminationProvider: Termination review operations (OFF-001)
 * - ResignationProvider: Employee resignation operations (OFF-018, OFF-019)
 * - ClearanceProvider: Clearance checklist operations (OFF-006, OFF-010)
 * - AccessRevocationProvider: Access revocation operations (OFF-007)
 * - FinalSettlementProvider: Final settlement operations (OFF-013)
 */
@Injectable()
export class OffboardingService {
  private terminationProvider: TerminationProvider;
  private resignationProvider: ResignationProvider;
  private clearanceProvider: ClearanceProvider;
  private accessRevocationProvider: AccessRevocationProvider;
  private finalSettlementProvider: FinalSettlementProvider;

  constructor(
    @InjectModel(TerminationRequest.name)
    private terminationModel: Model<TerminationRequestDocument>,
    @InjectModel(ClearanceChecklist.name)
    private clearanceModel: Model<ClearanceChecklistDocument>,
  ) {
    this.terminationProvider = new TerminationProvider(terminationModel);
    this.resignationProvider = new ResignationProvider(terminationModel);
    this.clearanceProvider = new ClearanceProvider(terminationModel, clearanceModel);
    this.accessRevocationProvider = new AccessRevocationProvider(terminationModel, clearanceModel);
    this.finalSettlementProvider = new FinalSettlementProvider(terminationModel, clearanceModel);
  }

  // ========== TERMINATION METHODS ==========
  async createTerminationReview(dto: CreateTerminationDto): Promise<TerminationRequestDocument> {
    return this.terminationProvider.createTerminationReview(dto);
  }

  async updateTerminationStatus(terminationId: string, dto: UpdateTerminationStatusDto): Promise<TerminationRequestDocument> {
    return this.terminationProvider.updateTerminationStatus(terminationId, dto);
  }

  async getTerminationById(terminationId: string): Promise<TerminationRequestDocument> {
    return this.terminationProvider.getTerminationById(terminationId);
  }

  async getAllTerminations(filters?: { status?: TerminationStatus; employeeId?: string }): Promise<TerminationRequestDocument[]> {
    return this.terminationProvider.getAllTerminations(filters);
  }

  async getTerminationApprovalPayload(terminationId: string): Promise<TerminationApprovalPayloadDto> {
    return this.terminationProvider.getTerminationApprovalPayload(terminationId);
  }

  // ========== RESIGNATION METHODS ==========
  async createResignationRequest(dto: CreateResignationDto): Promise<TerminationRequestDocument> {
    return this.resignationProvider.createResignationRequest(dto);
  }

  async getResignationStatus(employeeId: string): Promise<TerminationRequestDocument | null> {
    return this.resignationProvider.getResignationStatus(employeeId);
  }

  async getAllResignations(filters?: { status?: TerminationStatus }): Promise<TerminationRequestDocument[]> {
    return this.resignationProvider.getAllResignations(filters);
  }

  // ========== CLEARANCE METHODS ==========
  async createClearanceChecklist(terminationId: string): Promise<ClearanceChecklistDocument> {
    return this.clearanceProvider.createClearanceChecklist(terminationId);
  }

  async updateClearanceItem(clearanceId: string, dto: ClearanceItemUpdateDto): Promise<ClearanceChecklistDocument> {
    return this.clearanceProvider.updateClearanceItem(clearanceId, dto);
  }

  async getClearanceByTerminationId(terminationId: string): Promise<ClearanceChecklistDocument | null> {
    return this.clearanceProvider.getClearanceByTerminationId(terminationId);
  }

  async addEquipmentToChecklist(clearanceId: string, dto: AddEquipmentDto): Promise<ClearanceChecklistDocument> {
    return this.clearanceProvider.addEquipmentToChecklist(clearanceId, dto);
  }

  async markEquipmentReturned(clearanceId: string, equipmentId: string, dto: MarkEquipmentReturnedDto): Promise<ClearanceChecklistDocument> {
    return this.clearanceProvider.markEquipmentReturned(clearanceId, equipmentId, dto);
  }

  async updateCardReturnedStatus(clearanceId: string, cardReturned: boolean): Promise<ClearanceChecklistDocument> {
    return this.clearanceProvider.updateCardReturnedStatus(clearanceId, cardReturned);
  }

  async getClearanceStatusPayload(terminationId: string): Promise<ClearanceStatusPayloadDto> {
    return this.clearanceProvider.getClearanceStatusPayload(terminationId);
  }

  // ========== ACCESS REVOCATION METHODS ==========
  async logAccessRevocation(dto: RevokeAccessDto): Promise<AccessRevocationPayloadDto> {
    return this.accessRevocationProvider.logAccessRevocation(dto);
  }

  async getAccessRevocationHistory(employeeId: string): Promise<string[]> {
    return this.accessRevocationProvider.getAccessRevocationHistory(employeeId);
  }

  // ========== FINAL SETTLEMENT METHODS ==========
  async triggerFinalSettlement(dto: TriggerFinalSettlementDto): Promise<FinalSettlementPayloadDto> {
    return this.finalSettlementProvider.triggerFinalSettlement(dto);
  }

  async canTriggerSettlement(terminationId: string): Promise<boolean> {
    return this.finalSettlementProvider.canTriggerSettlement(terminationId);
  }

  async getSettlementReadinessStatus(terminationId: string): Promise<{
    ready: boolean;
    pendingDepartments: string[];
    message: string;
  }> {
    return this.finalSettlementProvider.getSettlementReadinessStatus(terminationId);
  }
}

