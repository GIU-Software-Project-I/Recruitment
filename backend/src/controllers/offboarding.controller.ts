import { Controller, Post, Get, Patch, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { OffboardingService } from '../services/offboarding.service';

// DTOs
import { CreateTerminationDto } from '../dto/offboarding/create-termination.dto';
import { UpdateTerminationStatusDto } from '../dto/offboarding/update-termination-status.dto';
import { CreateResignationDto } from '../dto/offboarding/create-resignation.dto';
import { ClearanceItemUpdateDto } from '../dto/offboarding/clearance-item-update.dto';
import { AddEquipmentDto } from '../dto/offboarding/add-equipment.dto';
import { MarkEquipmentReturnedDto } from '../dto/offboarding/mark-equipment-returned.dto';
import { RevokeAccessDto } from '../dto/offboarding/revoke-access.dto';
import { TriggerFinalSettlementDto } from '../dto/offboarding/trigger-final-settlement.dto';

// Enums
import { TerminationStatus } from '../enums/termination-status.enum';

// ============================================================================
// OFFBOARDING CONTROLLER - CONSOLIDATED
// ============================================================================
// All offboarding endpoints consolidated into a single controller with clear separation
// by requirement (OFF-001, OFF-006, OFF-007, OFF-010, OFF-013, OFF-018, OFF-019)
// ============================================================================

@Controller('offboarding')
export class OffboardingController {
  constructor(private readonly offboardingService: OffboardingService) {}

  // ============================================================================
  // SECTION 1: TERMINATION ENDPOINTS (OFF-001)
  // ============================================================================
  // OFF-001: HR Manager initiates termination reviews

  /**
   * Create termination review
   * POST /offboarding/termination
   */
  @Post('termination')
  async createTerminationReview(@Body() dto: CreateTerminationDto) {
    return await this.offboardingService.createTerminationReview(dto);
  }

  /**
   * Update termination status
   * PATCH /offboarding/termination/:id/status
   */
  @Patch('termination/:id/status')
  async updateTerminationStatus(
    @Param('id') id: string,
    @Body() dto: UpdateTerminationStatusDto,
  ) {
    return await this.offboardingService.updateTerminationStatus(id, dto);
  }

  /**
   * Get termination by ID
   * GET /offboarding/termination/:id
   */
  @Get('termination/:id')
  async getTerminationById(@Param('id') id: string) {
    return await this.offboardingService.getTerminationById(id);
  }

  /**
   * Get all terminations with optional filters
   * GET /offboarding/termination
   * Query params: status, employeeId
   */
  @Get('termination')
  async getAllTerminations(
    @Query('status') status?: TerminationStatus,
    @Query('employeeId') employeeId?: string,
  ) {
    return await this.offboardingService.getAllTerminations({ status, employeeId });
  }

  /**
   * Get termination approval payload for workflow system
   * GET /offboarding/termination/:id/approval-payload
   */
  @Get('termination/:id/approval-payload')
  async getTerminationApprovalPayload(@Param('id') id: string) {
    return await this.offboardingService.getTerminationApprovalPayload(id);
  }

  // ============================================================================
  // SECTION 2: RESIGNATION ENDPOINTS (OFF-018, OFF-019)
  // ============================================================================
  // OFF-018: Employee requests resignation
  // OFF-019: Employee tracks resignation status

  /**
   * Create resignation request
   * POST /offboarding/resignation
   */
  @Post('resignation')
  async createResignationRequest(@Body() dto: CreateResignationDto) {
    return await this.offboardingService.createResignationRequest(dto);
  }

  /**
   * Get resignation status for employee
   * GET /offboarding/resignation/:employeeId/status
   */
  @Get('resignation/:employeeId/status')
  async getResignationStatus(@Param('employeeId') employeeId: string) {
    return await this.offboardingService.getResignationStatus(employeeId);
  }

  /**
   * Get all resignations with optional filters
   * GET /offboarding/resignation
   * Query params: status
   */
  @Get('resignation')
  async getAllResignations(@Query('status') status?: TerminationStatus) {
    return await this.offboardingService.getAllResignations({ status });
  }

  // ============================================================================
  // SECTION 3: CLEARANCE ENDPOINTS (OFF-006, OFF-010)
  // ============================================================================
  // OFF-006: HR Manager uses offboarding checklist (assets, ID cards, equipment)
  // OFF-010: HR Manager obtains multi-department exit clearance sign-offs

  /**
   * Create clearance checklist
   * POST /offboarding/clearance
   */
  @Post('clearance')
  async createClearanceChecklist(@Body() body: { terminationId: string }) {
    return await this.offboardingService.createClearanceChecklist(body.terminationId);
  }

  /**
   * Update clearance item (department sign-off)
   * PATCH /offboarding/clearance/:id/department
   */
  @Patch('clearance/:id/department')
  async updateClearanceItem(@Param('id') id: string, @Body() dto: ClearanceItemUpdateDto) {
    return await this.offboardingService.updateClearanceItem(id, dto);
  }

  /**
   * Get clearance by termination ID
   * GET /offboarding/clearance/termination/:terminationId
   */
  @Get('clearance/termination/:terminationId')
  async getClearanceByTerminationId(@Param('terminationId') terminationId: string) {
    return await this.offboardingService.getClearanceByTerminationId(terminationId);
  }

  /**
   * Add equipment to clearance checklist
   * POST /offboarding/clearance/:id/equipment
   */
  @Post('clearance/:id/equipment')
  async addEquipmentToChecklist(@Param('id') id: string, @Body() dto: AddEquipmentDto) {
    return await this.offboardingService.addEquipmentToChecklist(id, dto);
  }

  /**
   * Mark equipment as returned
   * PATCH /offboarding/clearance/:id/equipment/:equipmentId
   */
  @Patch('clearance/:id/equipment/:equipmentId')
  async markEquipmentReturned(
    @Param('id') id: string,
    @Param('equipmentId') equipmentId: string,
    @Body() dto: MarkEquipmentReturnedDto,
  ) {
    return await this.offboardingService.markEquipmentReturned(id, equipmentId, dto);
  }

  /**
   * Update ID card returned status
   * PATCH /offboarding/clearance/:id/card
   */
  @Patch('clearance/:id/card')
  async updateCardReturnedStatus(@Param('id') id: string, @Body() body: { cardReturned: boolean }) {
    return await this.offboardingService.updateCardReturnedStatus(id, body.cardReturned);
  }

  /**
   * Get clearance status payload for Payroll module integration
   * GET /offboarding/clearance/:terminationId/status-payload
   */
  @Get('clearance/:terminationId/status-payload')
  async getClearanceStatusPayload(@Param('terminationId') terminationId: string) {
    return await this.offboardingService.getClearanceStatusPayload(terminationId);
  }

  // ============================================================================
  // SECTION 4: ACCESS REVOCATION ENDPOINTS (OFF-007)
  // ============================================================================
  // OFF-007: System Admin revokes system and account access upon termination

  /**
   * Log access revocation
   * POST /offboarding/access/revoke
   */
  @Post('access/revoke')
  @HttpCode(HttpStatus.OK)
  async revokeAccess(@Body() dto: RevokeAccessDto) {
    return await this.offboardingService.logAccessRevocation(dto);
  }

  /**
   * Get access revocation history
   * GET /offboarding/access/history/:employeeId
   */
  @Get('access/history/:employeeId')
  async getAccessRevocationHistory(@Param('employeeId') employeeId: string) {
    return await this.offboardingService.getAccessRevocationHistory(employeeId);
  }

  // ============================================================================
  // SECTION 5: FINAL SETTLEMENT ENDPOINTS (OFF-013)
  // ============================================================================
  // OFF-013: HR Manager triggers final pay calculation and benefits termination

  /**
   * Trigger final settlement
   * POST /offboarding/settlement/trigger
   */
  @Post('settlement/trigger')
  @HttpCode(HttpStatus.OK)
  async triggerFinalSettlement(@Body() dto: TriggerFinalSettlementDto) {
    return await this.offboardingService.triggerFinalSettlement(dto);
  }

  /**
   * Check if settlement can be triggered
   * GET /offboarding/settlement/can-trigger/:terminationId
   */
  @Get('settlement/can-trigger/:terminationId')
  async canTriggerSettlement(@Param('terminationId') terminationId: string) {
    const canTrigger = await this.offboardingService.canTriggerSettlement(terminationId);
    return { canTrigger };
  }

  /**
   * Get settlement readiness status
   * GET /offboarding/settlement/readiness/:terminationId
   */
  @Get('settlement/readiness/:terminationId')
  async getSettlementReadinessStatus(@Param('terminationId') terminationId: string) {
    return await this.offboardingService.getSettlementReadinessStatus(terminationId);
  }
}

