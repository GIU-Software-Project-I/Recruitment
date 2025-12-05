import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

// Recruitment Models
import { Application, ApplicationSchema } from './models/application.schema';
import { ApplicationStatusHistory, ApplicationStatusHistorySchema } from './models/application-history.schema';
import { AssessmentResult, AssessmentResultSchema } from './models/assessment-result.schema';
import { ClearanceChecklist, ClearanceChecklistSchema } from './models/clearance-checklist.schema';
import { JobTemplate, JobTemplateSchema } from './models/job-template.schema';
import { JobRequisition, JobRequisitionSchema } from './models/job-requisition.schema';
import { Referral, ReferralSchema } from './models/referral.schema';
import { Interview, InterviewSchema } from './models/interview.schema';
import { Offer, OfferSchema } from './models/offer.schema';
import { Contract, ContractSchema } from './models/contract.schema';
import { Document, DocumentSchema } from './models/document.schema';
import { Onboarding, OnboardingSchema } from './models/onboarding.schema';
import { TerminationRequest, TerminationRequestSchema } from './models/termination-request.schema';

// Employee Models
import { EmployeeProfile, EmployeeProfileSchema } from './modules/employee/models/Employee/employee-profile.schema';
import { Candidate, CandidateSchema } from './modules/employee/models/Employee/Candidate.Schema';
import { Department, DepartmentSchema } from './modules/employee/models/Organization-Structure/department.schema';
import { Position, PositionSchema } from './modules/employee/models/Organization-Structure/position.schema';

// Leave Models
import { LeaveType, LeaveTypeSchema } from './modules/leaves/models/leave-type.schema';

// Time Management Models
import { Shift, ShiftSchema } from './modules/time-management/models/shift.schema';
import { ShiftType, ShiftTypeSchema } from './modules/time-management/models/shift-type.schema';
import { ShiftAssignment, ShiftAssignmentSchema } from './modules/time-management/models/shift-assignment.schema';
import { AttendanceRecord, AttendanceRecordSchema } from './modules/time-management/models/attendance-record.schema';
import { Holiday, HolidaySchema } from './modules/time-management/models/holiday.schema';
import { OvertimeRule, OvertimeRuleSchema } from './modules/time-management/models/overtime-rule.schema';
import { LatenessRule, latenessRuleSchema } from './modules/time-management/models/lateness-rule.schema';
import { TimeException, TimeExceptionSchema } from './modules/time-management/models/time-exception.schema';
import { AttendanceCorrectionRequest, AttendanceCorrectionRequestSchema } from './modules/time-management/models/attendance-correction-request.schema';

// Payroll Configuration Models
import { payGrade, payGradeSchema } from './modules/payroll/payroll-configuration/models/payGrades.schema';
import { allowance, allowanceSchema } from './modules/payroll/payroll-configuration/models/allowance.schema';
import { payType, payTypeSchema } from './modules/payroll/payroll-configuration/models/payType.schema';
import { taxRules, taxRulesSchema } from './modules/payroll/payroll-configuration/models/taxRules.schema';
import { insuranceBrackets, insuranceBracketsSchema } from './modules/payroll/payroll-configuration/models/insuranceBrackets.schema';

// Payroll Execution Models
import { employeePayrollDetails, employeePayrollDetailsSchema } from './modules/payroll/payroll-execution/models/employeePayrollDetails.schema';
import { payrollRuns, payrollRunsSchema } from './modules/payroll/payroll-execution/models/payrollRuns.schema';
import { paySlip, paySlipSchema } from './modules/payroll/payroll-execution/models/payslip.schema';
import { employeeSigningBonus, employeeSigningBonusSchema } from './modules/payroll/payroll-execution/models/EmployeeSigningBonus.schema';
import { EmployeeTerminationResignation, EmployeeTerminationResignationSchema } from './modules/payroll/payroll-execution/models/EmployeeTerminationResignation.schema';

// Payroll Tracking Models
import { claims, claimsSchema } from './modules/payroll/payroll-tracking/models/claims.schema';
import { disputes, disputesSchema } from './modules/payroll/payroll-tracking/models/disputes.schema';
import { refunds, refundsSchema } from './modules/payroll/payroll-tracking/models/refunds.schema';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async () => ({
                uri: process.env.MONGODB_URI,
            }),
        }),
        MongooseModule.forFeature([
            // Recruitment Models
            { name: JobTemplate.name, schema: JobTemplateSchema },
            { name: JobRequisition.name, schema: JobRequisitionSchema },
            { name: Application.name, schema: ApplicationSchema },
            { name: ApplicationStatusHistory.name, schema: ApplicationStatusHistorySchema },
            { name: Referral.name, schema: ReferralSchema },
            { name: Interview.name, schema: InterviewSchema },
            { name: AssessmentResult.name, schema: AssessmentResultSchema },
            { name: Offer.name, schema: OfferSchema },
            { name: Contract.name, schema: ContractSchema },
            { name: Document.name, schema: DocumentSchema },
            { name: Onboarding.name, schema: OnboardingSchema },
            { name: ClearanceChecklist.name, schema: ClearanceChecklistSchema },
            { name: TerminationRequest.name, schema: TerminationRequestSchema },

            // Employee Models
            { name: EmployeeProfile.name, schema: EmployeeProfileSchema },
            { name: Candidate.name, schema: CandidateSchema },
            { name: Department.name, schema: DepartmentSchema },
            { name: Position.name, schema: PositionSchema },

            // Leave Models
            { name: LeaveType.name, schema: LeaveTypeSchema },

            // Time Management Models
            { name: Shift.name, schema: ShiftSchema },
            { name: ShiftType.name, schema: ShiftTypeSchema },
            { name: ShiftAssignment.name, schema: ShiftAssignmentSchema },
            { name: AttendanceRecord.name, schema: AttendanceRecordSchema },
            { name: Holiday.name, schema: HolidaySchema },
            { name: OvertimeRule.name, schema: OvertimeRuleSchema },
            { name: LatenessRule.name, schema: latenessRuleSchema },
            { name: TimeException.name, schema: TimeExceptionSchema },
            { name: AttendanceCorrectionRequest.name, schema: AttendanceCorrectionRequestSchema },

            // Payroll Configuration Models
            { name: 'payGrade', schema: payGradeSchema },
            { name: 'allowance', schema: allowanceSchema },
            { name: 'payType', schema: payTypeSchema },
            { name: 'taxRules', schema: taxRulesSchema },
            { name: 'insuranceBrackets', schema: insuranceBracketsSchema },

            // Payroll Execution Models
            { name: 'employeePayrollDetails', schema: employeePayrollDetailsSchema },
            { name: 'payrollRuns', schema: payrollRunsSchema },
            { name: 'paySlip', schema: paySlipSchema },
            { name: 'employeeSigningBonus', schema: employeeSigningBonusSchema },
            { name: 'EmployeeTerminationResignation', schema: EmployeeTerminationResignationSchema },

            // Payroll Tracking Models
            { name: 'claims', schema: claimsSchema },
            { name: 'disputes', schema: disputesSchema },
            { name: 'refunds', schema: refundsSchema },
        ]),
    ],
})
export class SeedModule {}

