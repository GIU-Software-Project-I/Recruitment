import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

// Recruitment Models
import { JobTemplate } from './models/job-template.schema';
import { JobRequisition } from './models/job-requisition.schema';
import { Application } from './models/application.schema';
import { ApplicationStatusHistory } from './models/application-history.schema';
import { Referral } from './models/referral.schema';
import { Interview } from './models/interview.schema';
import { AssessmentResult } from './models/assessment-result.schema';
import { Offer } from './models/offer.schema';
import { Contract } from './models/contract.schema';
import { Document } from './models/document.schema';
import { Onboarding } from './models/onboarding.schema';
import { ClearanceChecklist } from './models/clearance-checklist.schema';
import { TerminationRequest } from './models/termination-request.schema';

// Employee Models
import { EmployeeProfile } from './modules/employee/models/Employee/employee-profile.schema';
import { Candidate } from './modules/employee/models/Employee/Candidate.Schema';

// Organization Structure Models
import { Department } from './modules/employee/models/Organization-Structure/department.schema';
import { Position } from './modules/employee/models/Organization-Structure/position.schema';

// Leave Models
import { LeaveType } from './modules/leaves/models/leave-type.schema';

// Time Management Models
import { Shift } from './modules/time-management/models/shift.schema';
import { ShiftType } from './modules/time-management/models/shift-type.schema';
import { ShiftAssignment } from './modules/time-management/models/shift-assignment.schema';
import { AttendanceRecord } from './modules/time-management/models/attendance-record.schema';
import { Holiday } from './modules/time-management/models/holiday.schema';
import { OvertimeRule } from './modules/time-management/models/overtime-rule.schema';
import { LatenessRule } from './modules/time-management/models/lateness-rule.schema';
import { TimeException } from './modules/time-management/models/time-exception.schema';
import { AttendanceCorrectionRequest } from './modules/time-management/models/attendance-correction-request.schema';

// Payroll Configuration Models
import { payGrade } from './modules/payroll/payroll-configuration/models/payGrades.schema';
import { allowance } from './modules/payroll/payroll-configuration/models/allowance.schema';
import { payType } from './modules/payroll/payroll-configuration/models/payType.schema';
import { taxRules } from './modules/payroll/payroll-configuration/models/taxRules.schema';
import { insuranceBrackets } from './modules/payroll/payroll-configuration/models/insuranceBrackets.schema';

// Payroll Execution Models
import { employeePayrollDetails } from './modules/payroll/payroll-execution/models/employeePayrollDetails.schema';
import { payrollRuns } from './modules/payroll/payroll-execution/models/payrollRuns.schema';
import { paySlip } from './modules/payroll/payroll-execution/models/payslip.schema';
import { employeeSigningBonus } from './modules/payroll/payroll-execution/models/EmployeeSigningBonus.schema';
import { EmployeeTerminationResignation } from './modules/payroll/payroll-execution/models/EmployeeTerminationResignation.schema';

// Payroll Tracking Models
import { claims } from './modules/payroll/payroll-tracking/models/claims.schema';
import { disputes } from './modules/payroll/payroll-tracking/models/disputes.schema';
import { refunds } from './modules/payroll/payroll-tracking/models/refunds.schema';

// Enums
import { ApplicationStatus } from './enums/application-status.enum';
import { ApplicationStage } from './enums/application-stage.enum';
import { InterviewStatus } from './enums/interview-status.enum';
import { InterviewMethod } from './enums/interview-method.enum';
import { OfferResponseStatus } from './enums/offer-response-status.enum';
import { OfferFinalStatus } from './enums/offer-final-status.enum';
import { DocumentType } from './enums/document-type.enum';
import { OnboardingTaskStatus } from './enums/onboarding-task-status.enum';
import { ApprovalStatus } from './enums/approval-status.enum';
import { TerminationInitiation } from './enums/termination-initiation.enum';
import { TerminationStatus } from './enums/termination-status.enum';
import { CandidateStatus, EmployeeStatus, ContractType, WorkType } from './modules/employee/enums/employee-profile.enums';
import { PunchPolicy, HolidayType, TimeExceptionType, CorrectionRequestStatus } from './modules/time-management/models/enums/index';
import { ConfigStatus } from './modules/payroll/payroll-configuration/enums/payroll-configuration-enums';
import { PayRollStatus, PayRollPaymentStatus, BonusStatus, BenefitStatus } from './modules/payroll/payroll-execution/enums/payroll-execution-enum';

async function bootstrap() {
    console.log('🌱 Starting database seeding...\n');

    const app = await NestFactory.createApplicationContext(SeedModule);

    try {
        // Get all models
        const jobTemplateModel = app.get<Model<JobTemplate>>(getModelToken(JobTemplate.name));
        const jobRequisitionModel = app.get<Model<JobRequisition>>(getModelToken(JobRequisition.name));
        const applicationModel = app.get<Model<Application>>(getModelToken(Application.name));
        const applicationHistoryModel = app.get<Model<ApplicationStatusHistory>>(getModelToken(ApplicationStatusHistory.name));
        const referralModel = app.get<Model<Referral>>(getModelToken(Referral.name));
        const interviewModel = app.get<Model<Interview>>(getModelToken(Interview.name));
        const assessmentModel = app.get<Model<AssessmentResult>>(getModelToken(AssessmentResult.name));
        const offerModel = app.get<Model<Offer>>(getModelToken(Offer.name));
        const contractModel = app.get<Model<Contract>>(getModelToken(Contract.name));
        const documentModel = app.get<Model<Document>>(getModelToken(Document.name));
        const onboardingModel = app.get<Model<Onboarding>>(getModelToken(Onboarding.name));
        const clearanceModel = app.get<Model<ClearanceChecklist>>(getModelToken(ClearanceChecklist.name));
        const terminationModel = app.get<Model<TerminationRequest>>(getModelToken(TerminationRequest.name));
        const employeeModel = app.get<Model<EmployeeProfile>>(getModelToken(EmployeeProfile.name));
        const candidateModel = app.get<Model<Candidate>>(getModelToken(Candidate.name));
        const departmentModel = app.get<Model<Department>>(getModelToken(Department.name));
        const positionModel = app.get<Model<Position>>(getModelToken(Position.name));
        const leaveTypeModel = app.get<Model<LeaveType>>(getModelToken(LeaveType.name));

        // Time Management Models
        const shiftModel = app.get<Model<Shift>>(getModelToken(Shift.name));
        const shiftTypeModel = app.get<Model<ShiftType>>(getModelToken(ShiftType.name));
        const shiftAssignmentModel = app.get<Model<ShiftAssignment>>(getModelToken(ShiftAssignment.name));
        const attendanceModel = app.get<Model<AttendanceRecord>>(getModelToken(AttendanceRecord.name));
        const holidayModel = app.get<Model<Holiday>>(getModelToken(Holiday.name));
        const overtimeRuleModel = app.get<Model<OvertimeRule>>(getModelToken(OvertimeRule.name));
        const latenessRuleModel = app.get<Model<LatenessRule>>(getModelToken(LatenessRule.name));
        const timeExceptionModel = app.get<Model<TimeException>>(getModelToken(TimeException.name));
        const attendanceCorrectionModel = app.get<Model<AttendanceCorrectionRequest>>(getModelToken(AttendanceCorrectionRequest.name));

        // Payroll Configuration Models
        const payGradeModel = app.get<Model<payGrade>>(getModelToken('payGrade'));
        const allowanceModel = app.get<Model<allowance>>(getModelToken('allowance'));
        const payTypeModel = app.get<Model<payType>>(getModelToken('payType'));
        const taxRuleModel = app.get<Model<taxRules>>(getModelToken('taxRules'));
        const insuranceBracketModel = app.get<Model<insuranceBrackets>>(getModelToken('insuranceBrackets'));

        // Payroll Execution Models
        const employeePayrollDetailsModel = app.get<Model<employeePayrollDetails>>(getModelToken('employeePayrollDetails'));
        const payrollRunsModel = app.get<Model<payrollRuns>>(getModelToken('payrollRuns'));
        const payslipModel = app.get<Model<paySlip>>(getModelToken('paySlip'));
        const employeeSigningBonusModel = app.get<Model<employeeSigningBonus>>(getModelToken('employeeSigningBonus'));
        const employeeTerminationModel = app.get<Model<EmployeeTerminationResignation>>(getModelToken('EmployeeTerminationResignation'));

        // Payroll Tracking Models
        const claimModel = app.get<Model<claims>>(getModelToken('claims'));
        const disputeModel = app.get<Model<disputes>>(getModelToken('disputes'));
        const refundModel = app.get<Model<refunds>>(getModelToken('refunds'));

        // Clear existing data (optional)
        console.log('🗑️  Clearing existing data...');
        await Promise.all([
            jobTemplateModel.deleteMany({}),
            jobRequisitionModel.deleteMany({}),
            applicationModel.deleteMany({}),
            applicationHistoryModel.deleteMany({}),
            referralModel.deleteMany({}),
            interviewModel.deleteMany({}),
            assessmentModel.deleteMany({}),
            offerModel.deleteMany({}),
            contractModel.deleteMany({}),
            documentModel.deleteMany({}),
            onboardingModel.deleteMany({}),
            clearanceModel.deleteMany({}),
            terminationModel.deleteMany({}),
            employeeModel.deleteMany({}),
            candidateModel.deleteMany({}),
            departmentModel.deleteMany({}),
            positionModel.deleteMany({}),
            leaveTypeModel.deleteMany({}),
            // Time Management
            shiftModel.deleteMany({}),
            shiftTypeModel.deleteMany({}),
            shiftAssignmentModel.deleteMany({}),
            attendanceModel.deleteMany({}),
            holidayModel.deleteMany({}),
            overtimeRuleModel.deleteMany({}),
            latenessRuleModel.deleteMany({}),
            timeExceptionModel.deleteMany({}),
            attendanceCorrectionModel.deleteMany({}),
            // Payroll Configuration
            payGradeModel.deleteMany({}),
            allowanceModel.deleteMany({}),
            payTypeModel.deleteMany({}),
            taxRuleModel.deleteMany({}),
            insuranceBracketModel.deleteMany({}),
            // Payroll Execution
            employeePayrollDetailsModel.deleteMany({}),
            payrollRunsModel.deleteMany({}),
            payslipModel.deleteMany({}),
            employeeSigningBonusModel.deleteMany({}),
            employeeTerminationModel.deleteMany({}),
            // Payroll Tracking
            claimModel.deleteMany({}),
            disputeModel.deleteMany({}),
            refundModel.deleteMany({}),
        ]);
        console.log('✅ Data cleared\n');

        // ============================================================
        // SEED DEPARTMENTS
        // ============================================================
        console.log('📁 Seeding Departments...');
        const departments = await departmentModel.insertMany([
            {
                code: 'IT',
                name: 'Information Technology',
                description: 'Manages all IT infrastructure and software development',
                isActive: true,
            },
            {
                code: 'HR',
                name: 'Human Resources',
                description: 'Handles recruitment, employee relations, and benefits',
                isActive: true,
            },
            {
                code: 'FIN',
                name: 'Finance',
                description: 'Manages financial operations and accounting',
                isActive: true,
            },
            {
                code: 'MKT',
                name: 'Marketing',
                description: 'Handles marketing strategies and campaigns',
                isActive: true,
            },
            {
                code: 'OPS',
                name: 'Operations',
                description: 'Manages day-to-day business operations',
                isActive: true,
            },
        ]);
        console.log(`✅ Created ${departments.length} departments\n`);

        // ============================================================
        // SEED POSITIONS
        // ============================================================
        console.log('💼 Seeding Positions...');
        const positions = await positionModel.insertMany([
            {
                code: 'SWE-001',
                title: 'Senior Software Engineer',
                departmentId: departments[0]._id,
                description: 'Develops and maintains software applications',
                isActive: true,
            },
            {
                code: 'HRM-001',
                title: 'HR Manager',
                departmentId: departments[1]._id,
                description: 'Manages HR department and recruitment',
                isActive: true,
            },
            {
                code: 'ACC-001',
                title: 'Senior Accountant',
                departmentId: departments[2]._id,
                description: 'Manages financial records and reporting',
                isActive: true,
            },
            {
                code: 'MKT-001',
                title: 'Marketing Manager',
                departmentId: departments[3]._id,
                description: 'Leads marketing initiatives',
                isActive: true,
            },
            {
                code: 'OPM-001',
                title: 'Operations Manager',
                departmentId: departments[4]._id,
                description: 'Oversees daily operations',
                isActive: true,
            },
        ]);
        console.log(`✅ Created ${positions.length} positions\n`);

        // ============================================================
        // SEED CANDIDATES
        // ============================================================
        console.log('👥 Seeding Candidates...');
        const candidates = await candidateModel.insertMany([
            {
                candidateNumber: 'CND-001',
                firstName: 'John',
                lastName: 'Doe',
                nationalId: '12345678901',
                email: 'john.doe@example.com',
                phone: '+1234567890',
                departmentId: departments[0]._id,
                positionId: positions[0]._id,
                applicationDate: new Date('2025-11-01'),
                status: CandidateStatus.APPLIED,
                resumeUrl: '/resumes/john-doe.pdf',
            },
            {
                candidateNumber: 'CND-002',
                firstName: 'Jane',
                lastName: 'Smith',
                nationalId: '12345678902',
                email: 'jane.smith@example.com',
                phone: '+1234567891',
                departmentId: departments[1]._id,
                positionId: positions[1]._id,
                applicationDate: new Date('2025-11-05'),
                status: CandidateStatus.INTERVIEW,
                resumeUrl: '/resumes/jane-smith.pdf',
            },
            {
                candidateNumber: 'CND-003',
                firstName: 'Michael',
                lastName: 'Johnson',
                nationalId: '12345678903',
                email: 'michael.j@example.com',
                phone: '+1234567892',
                departmentId: departments[2]._id,
                positionId: positions[2]._id,
                applicationDate: new Date('2025-11-10'),
                status: CandidateStatus.OFFER_SENT,
                resumeUrl: '/resumes/michael-johnson.pdf',
            },
            {
                candidateNumber: 'CND-004',
                firstName: 'Emily',
                lastName: 'Williams',
                nationalId: '12345678904',
                email: 'emily.w@example.com',
                phone: '+1234567893',
                departmentId: departments[3]._id,
                positionId: positions[3]._id,
                applicationDate: new Date('2025-11-15'),
                status: CandidateStatus.SCREENING,
                resumeUrl: '/resumes/emily-williams.pdf',
            },
            {
                candidateNumber: 'CND-005',
                firstName: 'David',
                lastName: 'Brown',
                nationalId: '12345678905',
                email: 'david.brown@example.com',
                phone: '+1234567894',
                departmentId: departments[4]._id,
                positionId: positions[4]._id,
                applicationDate: new Date('2025-11-20'),
                status: CandidateStatus.REJECTED,
                resumeUrl: '/resumes/david-brown.pdf',
            },
        ]);
        console.log(`✅ Created ${candidates.length} candidates\n`);

        // ============================================================
        // SEED JOB TEMPLATES
        // ============================================================
        console.log('📋 Seeding Job Templates...');
        const jobTemplates = await jobTemplateModel.insertMany([
            {
                title: 'Software Engineer Template',
                department: 'Information Technology',
                description: 'Standard template for software engineering roles',
                qualifications: ['BSc in Computer Science', '5+ years experience'],
                skills: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
            },
            {
                title: 'HR Specialist Template',
                department: 'Human Resources',
                description: 'Standard template for HR roles',
                qualifications: ['BSc in HR', 'Strong communication skills'],
                skills: ['Recruitment', 'Employee Relations', 'HRIS'],
            },
            {
                title: 'Accountant Template',
                department: 'Finance',
                description: 'Standard template for accounting roles',
                qualifications: ['BSc in Accounting', 'CPA preferred'],
                skills: ['Financial Reporting', 'QuickBooks', 'Excel'],
            },
            {
                title: 'Marketing Specialist Template',
                department: 'Marketing',
                description: 'Standard template for marketing roles',
                qualifications: ['BSc in Marketing', 'Digital marketing experience'],
                skills: ['Social Media', 'SEO', 'Content Creation'],
            },
            {
                title: 'Operations Coordinator Template',
                department: 'Operations',
                description: 'Standard template for operations roles',
                qualifications: ['BSc in Business', 'Project management experience'],
                skills: ['Process Management', 'Logistics', 'Quality Control'],
            },
        ]);
        console.log(`✅ Created ${jobTemplates.length} job templates\n`);

        // ============================================================
        // SEED JOB REQUISITIONS
        // ============================================================
        console.log('📝 Seeding Job Requisitions...');
        const jobRequisitions = await jobRequisitionModel.insertMany([
            {
                requisitionId: 'REQ-2025-001',
                templateId: jobTemplates[0]._id,
                hiringManagerId: candidates[0]._id,
                openings: 3,
                location: 'New York, NY',
                publishStatus: 'published',
                postingDate: new Date('2025-11-01'),
                expiryDate: new Date('2026-01-01'),
            },
            {
                requisitionId: 'REQ-2025-002',
                templateId: jobTemplates[1]._id,
                hiringManagerId: candidates[1]._id,
                openings: 1,
                location: 'San Francisco, CA',
                publishStatus: 'draft',
            },
            {
                requisitionId: 'REQ-2025-003',
                templateId: jobTemplates[2]._id,
                hiringManagerId: candidates[2]._id,
                openings: 2,
                location: 'Chicago, IL',
                publishStatus: 'published',
                postingDate: new Date('2025-11-15'),
                expiryDate: new Date('2026-02-15'),
            },
            {
                requisitionId: 'REQ-2025-004',
                templateId: jobTemplates[3]._id,
                hiringManagerId: candidates[3]._id,
                openings: 1,
                location: 'Austin, TX',
                publishStatus: 'published',
                postingDate: new Date('2025-11-18'),
                expiryDate: new Date('2026-01-18'),
            },
            {
                requisitionId: 'REQ-2025-005',
                templateId: jobTemplates[4]._id,
                hiringManagerId: candidates[4]._id,
                openings: 2,
                location: 'Seattle, WA',
                publishStatus: 'closed',
                postingDate: new Date('2025-10-25'),
                expiryDate: new Date('2025-11-25'),
            },
        ]);
        console.log(`✅ Created ${jobRequisitions.length} job requisitions\n`);

        // ============================================================
        // SEED APPLICATIONS
        // ============================================================
        console.log('📄 Seeding Applications...');
        const applications = await applicationModel.insertMany([
            {
                candidateId: candidates[0]._id,
                requisitionId: jobRequisitions[0]._id,
                status: ApplicationStatus.IN_PROCESS,
                currentStage: ApplicationStage.SCREENING,
            },
            {
                candidateId: candidates[1]._id,
                requisitionId: jobRequisitions[1]._id,
                status: ApplicationStatus.IN_PROCESS,
                currentStage: ApplicationStage.HR_INTERVIEW,
            },
            {
                candidateId: candidates[2]._id,
                requisitionId: jobRequisitions[2]._id,
                status: ApplicationStatus.OFFER,
                currentStage: ApplicationStage.OFFER,
            },
            {
                candidateId: candidates[3]._id,
                requisitionId: jobRequisitions[3]._id,
                status: ApplicationStatus.SUBMITTED,
                currentStage: ApplicationStage.SCREENING,
            },
            {
                candidateId: candidates[4]._id,
                requisitionId: jobRequisitions[4]._id,
                status: ApplicationStatus.REJECTED,
                currentStage: ApplicationStage.SCREENING,
            },
        ]);
        console.log(`✅ Created ${applications.length} applications\n`);

        // ============================================================
        // SEED APPLICATION HISTORY
        // ============================================================
        console.log('📊 Seeding Application History...');
        const applicationHistory = await applicationHistoryModel.insertMany([
            {
                applicationId: applications[0]._id,
                oldStatus: ApplicationStatus.SUBMITTED,
                newStatus: ApplicationStatus.IN_PROCESS,
                oldStage: ApplicationStage.SCREENING,
                newStage: ApplicationStage.SCREENING,
                changedBy: candidates[1]._id,
            },
            {
                applicationId: applications[0]._id,
                oldStatus: ApplicationStatus.IN_PROCESS,
                newStatus: ApplicationStatus.IN_PROCESS,
                oldStage: ApplicationStage.SCREENING,
                newStage: ApplicationStage.DEPARTMENT_INTERVIEW,
                changedBy: candidates[1]._id,
            },
            {
                applicationId: applications[1]._id,
                oldStatus: ApplicationStatus.SUBMITTED,
                newStatus: ApplicationStatus.IN_PROCESS,
                oldStage: ApplicationStage.SCREENING,
                newStage: ApplicationStage.HR_INTERVIEW,
                changedBy: candidates[1]._id,
            },
            {
                applicationId: applications[1]._id,
                oldStatus: ApplicationStatus.IN_PROCESS,
                newStatus: ApplicationStatus.IN_PROCESS,
                oldStage: ApplicationStage.HR_INTERVIEW,
                newStage: ApplicationStage.OFFER,
                changedBy: candidates[1]._id,
            },
            {
                applicationId: applications[2]._id,
                oldStatus: ApplicationStatus.IN_PROCESS,
                newStatus: ApplicationStatus.OFFER,
                oldStage: ApplicationStage.DEPARTMENT_INTERVIEW,
                newStage: ApplicationStage.OFFER,
                changedBy: candidates[1]._id,
            },
        ]);
        console.log(`✅ Created ${applicationHistory.length} application history records\n`);

        // ============================================================
        // SEED REFERRALS
        // ============================================================
        console.log('🤝 Seeding Referrals...');
        const referrals = await referralModel.insertMany([
            {
                referringEmployeeId: candidates[0]._id,
                candidateId: candidates[1]._id,
                role: 'Software Engineer',
                level: 'Senior',
            },
            {
                referringEmployeeId: candidates[1]._id,
                candidateId: candidates[2]._id,
                role: 'HR Manager',
                level: 'Manager',
            },
            {
                referringEmployeeId: candidates[2]._id,
                candidateId: candidates[3]._id,
                role: 'Accountant',
                level: 'Senior',
            },
            {
                referringEmployeeId: candidates[3]._id,
                candidateId: candidates[4]._id,
                role: 'Marketing Specialist',
                level: 'Mid',
            },
            {
                referringEmployeeId: candidates[0]._id,
                candidateId: candidates[4]._id,
                role: 'Operations Coordinator',
                level: 'Junior',
            },
        ]);
        console.log(`✅ Created ${referrals.length} referrals\n`);

        // ============================================================
        // SEED INTERVIEWS
        // ============================================================
        console.log('🎤 Seeding Interviews...');
        const interviews = await interviewModel.insertMany([
            {
                applicationId: applications[0]._id,
                stage: ApplicationStage.DEPARTMENT_INTERVIEW,
                panel: [candidates[1]._id, candidates[2]._id],
                scheduledDate: new Date('2025-12-05T10:00:00Z'),
                method: InterviewMethod.VIDEO,
                status: InterviewStatus.SCHEDULED,
                videoLink: 'https://zoom.us/j/123456789',
            },
            {
                applicationId: applications[1]._id,
                stage: ApplicationStage.HR_INTERVIEW,
                panel: [candidates[0]._id],
                scheduledDate: new Date('2025-12-08T14:00:00Z'),
                method: InterviewMethod.ONSITE,
                status: InterviewStatus.COMPLETED,
            },
            {
                applicationId: applications[2]._id,
                stage: ApplicationStage.DEPARTMENT_INTERVIEW,
                panel: [candidates[1]._id, candidates[2]._id],
                scheduledDate: new Date('2025-12-10T09:00:00Z'),
                method: InterviewMethod.PHONE,
                status: InterviewStatus.COMPLETED,
            },
            {
                applicationId: applications[3]._id,
                stage: ApplicationStage.HR_INTERVIEW,
                panel: [candidates[3]._id],
                scheduledDate: new Date('2025-12-12T11:00:00Z'),
                method: InterviewMethod.VIDEO,
                status: InterviewStatus.SCHEDULED,
                videoLink: 'https://teams.microsoft.com/meet/abc123',
            },
            {
                applicationId: applications[0]._id,
                stage: ApplicationStage.DEPARTMENT_INTERVIEW,
                panel: [candidates[0]._id, candidates[1]._id],
                scheduledDate: new Date('2025-12-15T15:00:00Z'),
                method: InterviewMethod.ONSITE,
                status: InterviewStatus.SCHEDULED,
            },
        ]);
        console.log(`✅ Created ${interviews.length} interviews\n`);

        // ============================================================
        // SEED ASSESSMENT RESULTS
        // ============================================================
        console.log('📈 Seeding Assessment Results...');
        const assessments = await assessmentModel.insertMany([
            {
                interviewId: interviews[0]._id,
                interviewerId: candidates[0]._id,
                score: 85,
                comments: 'Strong technical skills, good problem-solving',
            },
            {
                interviewId: interviews[1]._id,
                interviewerId: candidates[1]._id,
                score: 92,
                comments: 'Excellent fit for team culture',
            },
            {
                interviewId: interviews[2]._id,
                interviewerId: candidates[2]._id,
                score: 95,
                comments: 'Expert level accounting knowledge',
            },
            {
                interviewId: interviews[3]._id,
                interviewerId: candidates[3]._id,
                score: 78,
                comments: 'Good strategic thinking',
            },
            {
                interviewId: interviews[4]._id,
                interviewerId: candidates[4]._id,
                score: 65,
                comments: 'Below expected performance level',
            },
        ]);
        console.log(`✅ Created ${assessments.length} assessment results\n`);

        // ============================================================
        // SEED DOCUMENTS
        // ============================================================
        console.log('📂 Seeding Documents...');
        const documents = await documentModel.insertMany([
            {
                ownerId: candidates[0]._id,
                type: DocumentType.CV,
                filePath: '/documents/john-doe-cv.pdf',
                uploadedAt: new Date('2025-11-01'),
            },
            {
                ownerId: candidates[1]._id,
                type: DocumentType.CV,
                filePath: '/documents/jane-smith-cv.pdf',
                uploadedAt: new Date('2025-11-05'),
            },
            {
                ownerId: candidates[2]._id,
                type: DocumentType.ID,
                filePath: '/documents/michael-johnson-id.pdf',
                uploadedAt: new Date('2025-11-10'),
            },
            {
                ownerId: candidates[3]._id,
                type: DocumentType.CERTIFICATE,
                filePath: '/documents/emily-williams-cert.pdf',
                uploadedAt: new Date('2025-11-15'),
            },
            {
                ownerId: candidates[4]._id,
                type: DocumentType.CV,
                filePath: '/documents/david-brown-cv.pdf',
                uploadedAt: new Date('2025-11-20'),
            },
        ]);
        console.log(`✅ Created ${documents.length} documents\n`);

        // ============================================================
        // SEED OFFERS
        // ============================================================
        console.log('💰 Seeding Offers...');
        const offers = await offerModel.insertMany([
            {
                applicationId: applications[2]._id,
                candidateId: candidates[2]._id,
                grossSalary: 85000,
                signingBonus: 5000,
                benefits: ['Health Insurance', '401k Matching', 'Paid Time Off'],
                role: 'Senior Accountant',
                deadline: new Date('2025-12-15'),
                applicantResponse: OfferResponseStatus.ACCEPTED,
                finalStatus: OfferFinalStatus.APPROVED,
                candidateSignedAt: new Date('2025-12-05'),
            },
            {
                applicationId: applications[1]._id,
                candidateId: candidates[1]._id,
                grossSalary: 75000,
                signingBonus: 3000,
                benefits: ['Health Insurance', 'Professional Development Budget'],
                role: 'HR Manager',
                deadline: new Date('2025-12-16'),
                applicantResponse: OfferResponseStatus.PENDING,
                finalStatus: OfferFinalStatus.PENDING,
            },
            {
                applicationId: applications[0]._id,
                candidateId: candidates[0]._id,
                grossSalary: 95000,
                signingBonus: 10000,
                benefits: ['Health Insurance', '401k Matching', 'Stock Options', 'Remote Work'],
                role: 'Senior Software Engineer',
                deadline: new Date('2025-12-17'),
                applicantResponse: OfferResponseStatus.PENDING,
                finalStatus: OfferFinalStatus.PENDING,
            },
            {
                applicationId: applications[3]._id,
                candidateId: candidates[3]._id,
                grossSalary: 70000,
                signingBonus: 2000,
                benefits: ['Health Insurance', 'Flexible Schedule'],
                role: 'Marketing Manager',
                deadline: new Date('2025-12-12'),
                applicantResponse: OfferResponseStatus.REJECTED,
                finalStatus: OfferFinalStatus.REJECTED,
            },
            {
                applicationId: applications[2]._id,
                candidateId: candidates[2]._id,
                grossSalary: 80000,
                signingBonus: 4000,
                benefits: ['Health Insurance', 'Performance Bonuses'],
                role: 'Accountant',
                deadline: new Date('2025-12-09'),
                applicantResponse: OfferResponseStatus.PENDING,
                finalStatus: OfferFinalStatus.PENDING,
            },
        ]);
        console.log(`✅ Created ${offers.length} offers\n`);

        // ============================================================
        // SEED CONTRACTS
        // ============================================================
        console.log('📜 Seeding Contracts...');
        const contracts = await contractModel.insertMany([
            {
                offerId: offers[0]._id,
                acceptanceDate: new Date('2025-12-05'),
                grossSalary: 85000,
                signingBonus: 5000,
                role: 'Senior Accountant',
                benefits: ['Health Insurance', '401k Matching', 'Paid Time Off'],
                documentId: documents[2]._id,
                employeeSignatureUrl: '/signatures/michael-johnson-sig.png',
                employerSignatureUrl: '/signatures/company-sig.png',
                employeeSignedAt: new Date('2025-12-05T10:00:00Z'),
                employerSignedAt: new Date('2025-12-05T14:00:00Z'),
            },
            {
                offerId: offers[1]._id,
                acceptanceDate: new Date('2025-12-10'),
                grossSalary: 75000,
                signingBonus: 3000,
                role: 'HR Manager',
                benefits: ['Health Insurance', 'Professional Development Budget'],
                documentId: documents[1]._id,
                employeeSignatureUrl: '/signatures/jane-smith-sig.png',
                employeeSignedAt: new Date('2025-12-10T09:00:00Z'),
            },
            {
                offerId: offers[2]._id,
                acceptanceDate: new Date('2025-12-15'),
                grossSalary: 100000,
                signingBonus: 10000,
                role: 'Senior Software Engineer',
                benefits: ['Health Insurance', '401k Matching', 'Stock Options', 'Remote Work'],
                documentId: documents[0]._id,
                employeeSignatureUrl: '/signatures/john-doe-sig.png',
                employerSignatureUrl: '/signatures/company-sig.png',
                employeeSignedAt: new Date('2025-12-15T11:00:00Z'),
                employerSignedAt: new Date('2025-12-15T15:00:00Z'),
            },
            {
                offerId: offers[0]._id,
                acceptanceDate: new Date('2025-12-06'),
                grossSalary: 82000,
                signingBonus: 4500,
                role: 'Accountant',
                benefits: ['Health Insurance', 'Retirement Plan'],
                documentId: documents[2]._id,
            },
            {
                offerId: offers[2]._id,
                acceptanceDate: new Date('2025-12-12'),
                grossSalary: 98000,
                signingBonus: 8000,
                role: 'Software Engineer',
                benefits: ['Health Insurance', 'Remote Work'],
                documentId: documents[0]._id,
            },
        ]);
        console.log(`✅ Created ${contracts.length} contracts\n`);

        // ============================================================
        // SEED EMPLOYEES
        // ============================================================
        console.log('👔 Seeding Employees...');
        const employees = await employeeModel.insertMany([
            {
                employeeNumber: 'EMP-001',
                firstName: 'Michael',
                lastName: 'Johnson',
                nationalId: '12345678903',
                personalEmail: 'michael.j@company.com',
                workEmail: 'michael.johnson@company.com',
                mobilePhone: '+1234567892',
                dateOfHire: new Date('2026-01-15'),
                contractStartDate: new Date('2026-01-15'),
                contractEndDate: new Date('2027-01-15'),
                contractType: ContractType.FULL_TIME_CONTRACT,
                workType: WorkType.FULL_TIME,
                bankName: 'Bank of America',
                bankAccountNumber: '1234567890',
                status: EmployeeStatus.ACTIVE,
                biography: 'Experienced accountant with CPA certification',
            },
            {
                employeeNumber: 'EMP-002',
                firstName: 'Jane',
                lastName: 'Smith',
                nationalId: '12345678902',
                personalEmail: 'jane.s@company.com',
                workEmail: 'jane.smith@company.com',
                mobilePhone: '+1234567891',
                dateOfHire: new Date('2026-02-01'),
                contractStartDate: new Date('2026-02-01'),
                contractType: ContractType.FULL_TIME_CONTRACT,
                workType: WorkType.FULL_TIME,
                bankName: 'Chase Bank',
                bankAccountNumber: '9876543210',
                status: EmployeeStatus.ACTIVE,
                biography: 'HR professional with 5+ years experience',
            },
            {
                employeeNumber: 'EMP-003',
                firstName: 'John',
                lastName: 'Doe',
                nationalId: '12345678901',
                personalEmail: 'john.d@company.com',
                workEmail: 'john.doe@company.com',
                mobilePhone: '+1234567890',
                dateOfHire: new Date('2026-01-20'),
                contractStartDate: new Date('2026-01-20'),
                contractType: ContractType.FULL_TIME_CONTRACT,
                workType: WorkType.FULL_TIME,
                bankName: 'Wells Fargo',
                bankAccountNumber: '5555555555',
                status: EmployeeStatus.ACTIVE,
                biography: 'Senior software engineer specializing in full-stack development',
            },
            {
                employeeNumber: 'EMP-004',
                firstName: 'Sarah',
                lastName: 'Wilson',
                nationalId: '12345678906',
                personalEmail: 'sarah.w@company.com',
                workEmail: 'sarah.wilson@company.com',
                mobilePhone: '+1234567895',
                dateOfHire: new Date('2025-06-01'),
                contractStartDate: new Date('2025-06-01'),
                contractEndDate: new Date('2026-06-01'),
                contractType: ContractType.PART_TIME_CONTRACT,
                workType: WorkType.PART_TIME,
                bankName: 'Citibank',
                bankAccountNumber: '7777777777',
                status: EmployeeStatus.ACTIVE,
                biography: 'Marketing specialist with digital expertise',
            },
            {
                employeeNumber: 'EMP-005',
                firstName: 'Robert',
                lastName: 'Davis',
                nationalId: '12345678907',
                personalEmail: 'robert.d@company.com',
                workEmail: 'robert.davis@company.com',
                mobilePhone: '+1234567896',
                dateOfHire: new Date('2024-03-15'),
                contractStartDate: new Date('2024-03-15'),
                contractType: ContractType.FULL_TIME_CONTRACT,
                workType: WorkType.FULL_TIME,
                bankName: 'Bank of America',
                bankAccountNumber: '3333333333',
                status: EmployeeStatus.INACTIVE,
                biography: 'Former operations manager',
            },
        ]);
        console.log(`✅ Created ${employees.length} employees\n`);

        // ============================================================
        // SEED ONBOARDING
        // ============================================================
        console.log('🎯 Seeding Onboarding...');
        const onboardings = await onboardingModel.insertMany([
            {
                employeeId: employees[0]._id,
                contractId: contracts[0]._id,
                tasks: [
                    {
                        name: 'Complete I-9 Form',
                        department: 'HR',
                        status: OnboardingTaskStatus.COMPLETED,
                        deadline: new Date('2026-01-14'),
                        completedAt: new Date('2026-01-12'),
                        notes: 'Completed ahead of schedule',
                    },
                    {
                        name: 'IT System Setup',
                        department: 'IT',
                        status: OnboardingTaskStatus.COMPLETED,
                        deadline: new Date('2026-01-15'),
                        completedAt: new Date('2026-01-14'),
                        notes: 'All accounts created',
                    },
                    {
                        name: 'Benefits Enrollment',
                        department: 'HR',
                        status: OnboardingTaskStatus.PENDING,
                        deadline: new Date('2026-01-20'),
                        notes: 'Pending employee selection',
                    },
                ],
                completed: false,
            },
            {
                employeeId: employees[1]._id,
                contractId: contracts[1]._id,
                tasks: [
                    {
                        name: 'Complete I-9 Form',
                        department: 'HR',
                        status: OnboardingTaskStatus.IN_PROGRESS,
                        deadline: new Date('2026-01-31'),
                        notes: 'In progress',
                    },
                    {
                        name: 'IT System Setup',
                        department: 'IT',
                        status: OnboardingTaskStatus.PENDING,
                        deadline: new Date('2026-02-01'),
                        notes: 'Scheduled for Jan 30',
                    },
                ],
                completed: false,
            },
            {
                employeeId: employees[2]._id,
                contractId: contracts[2]._id,
                tasks: [
                    {
                        name: 'Complete I-9 Form',
                        department: 'HR',
                        status: OnboardingTaskStatus.COMPLETED,
                        deadline: new Date('2026-01-19'),
                        completedAt: new Date('2026-01-18'),
                    },
                    {
                        name: 'IT System Setup',
                        department: 'IT',
                        status: OnboardingTaskStatus.COMPLETED,
                        deadline: new Date('2026-01-20'),
                        completedAt: new Date('2026-01-19'),
                    },
                    {
                        name: 'Benefits Enrollment',
                        department: 'HR',
                        status: OnboardingTaskStatus.COMPLETED,
                        deadline: new Date('2026-01-25'),
                        completedAt: new Date('2026-01-22'),
                    },
                ],
                completed: true,
                completedAt: new Date('2026-01-22'),
            },
            {
                employeeId: employees[3]._id,
                contractId: contracts[0]._id,
                tasks: [
                    {
                        name: 'Complete I-9 Form',
                        department: 'HR',
                        status: OnboardingTaskStatus.PENDING,
                        deadline: new Date('2025-12-31'),
                    },
                ],
                completed: false,
            },
            {
                employeeId: employees[0]._id,
                contractId: contracts[1]._id,
                tasks: [
                    {
                        name: 'Department Orientation',
                        department: 'Manager',
                        status: OnboardingTaskStatus.PENDING,
                        deadline: new Date('2026-01-16'),
                        notes: 'Meet with team',
                    },
                ],
                completed: false,
            },
        ]);
        console.log(`✅ Created ${onboardings.length} onboarding records\n`);

        // ============================================================
        // SEED TERMINATION REQUESTS
        // ============================================================
        console.log('📋 Seeding Termination Requests...');
        const terminations = await terminationModel.insertMany([
            {
                employeeId: employees[4]._id,
                initiator: TerminationInitiation.HR,
                reason: 'Performance issues after multiple warnings',
                hrComments: 'All progressive discipline steps completed',
                status: TerminationStatus.APPROVED,
                terminationDate: new Date('2025-11-30'),
                contractId: contracts[0]._id,
            },
            {
                employeeId: employees[3]._id,
                initiator: TerminationInitiation.EMPLOYEE,
                reason: 'Accepted position at another company',
                employeeComments: 'Thank you for the opportunity',
                status: TerminationStatus.APPROVED,
                terminationDate: new Date('2025-12-31'),
                contractId: contracts[1]._id,
            },
            {
                employeeId: employees[2]._id,
                initiator: TerminationInitiation.MANAGER,
                reason: 'Departmental restructuring',
                hrComments: 'Redundancy due to department consolidation',
                status: TerminationStatus.UNDER_REVIEW,
                terminationDate: new Date('2026-03-31'),
                contractId: contracts[2]._id,
            },
            {
                employeeId: employees[1]._id,
                initiator: TerminationInitiation.EMPLOYEE,
                reason: 'Relocating to another city',
                employeeComments: 'Family reasons',
                status: TerminationStatus.PENDING,
                terminationDate: new Date('2026-04-30'),
                contractId: contracts[1]._id,
            },
            {
                employeeId: employees[0]._id,
                initiator: TerminationInitiation.HR,
                reason: 'Violation of company policy',
                hrComments: 'Investigation completed, termination recommended',
                status: TerminationStatus.REJECTED,
                terminationDate: new Date('2026-01-31'),
                contractId: contracts[0]._id,
            },
        ]);
        console.log(`✅ Created ${terminations.length} termination requests\n`);

        // ============================================================
        // SEED CLEARANCE CHECKLISTS
        // ============================================================
        console.log('✅ Seeding Clearance Checklists...');
        const clearanceChecklists = await clearanceModel.insertMany([
            {
                terminationId: terminations[0]._id,
                items: [
                    {
                        department: 'IT',
                        status: ApprovalStatus.APPROVED,
                        comments: 'Laptop and access card returned',
                        updatedBy: employees[1]._id,
                        updatedAt: new Date('2025-11-28'),
                    },
                    {
                        department: 'Finance',
                        status: ApprovalStatus.APPROVED,
                        comments: 'All expenses settled',
                        updatedBy: employees[2]._id,
                        updatedAt: new Date('2025-11-29'),
                    },
                    {
                        department: 'HR',
                        status: ApprovalStatus.APPROVED,
                        comments: 'Exit interview completed',
                        updatedBy: employees[1]._id,
                        updatedAt: new Date('2025-11-30'),
                    },
                ],
                equipmentList: [
                    {
                        name: 'Laptop Dell XPS 15',
                        returned: true,
                        condition: 'Good',
                    },
                    {
                        name: 'Monitor Samsung 27"',
                        returned: true,
                        condition: 'Excellent',
                    },
                ],
                cardReturned: true,
            },
            {
                terminationId: terminations[1]._id,
                items: [
                    {
                        department: 'IT',
                        status: ApprovalStatus.PENDING,
                        comments: 'Pending equipment return',
                        updatedAt: new Date(),
                    },
                    {
                        department: 'Finance',
                        status: ApprovalStatus.APPROVED,
                        comments: 'No outstanding payments',
                        updatedBy: employees[2]._id,
                        updatedAt: new Date('2025-12-01'),
                    },
                ],
                equipmentList: [
                    {
                        name: 'Laptop HP ProBook',
                        returned: false,
                    },
                ],
                cardReturned: false,
            },
            {
                terminationId: terminations[2]._id,
                items: [
                    {
                        department: 'IT',
                        status: ApprovalStatus.PENDING,
                        updatedAt: new Date(),
                    },
                    {
                        department: 'Finance',
                        status: ApprovalStatus.PENDING,
                        updatedAt: new Date(),
                    },
                    {
                        department: 'HR',
                        status: ApprovalStatus.PENDING,
                        updatedAt: new Date(),
                    },
                ],
                equipmentList: [],
                cardReturned: false,
            },
            {
                terminationId: terminations[3]._id,
                items: [
                    {
                        department: 'IT',
                        status: ApprovalStatus.REJECTED,
                        comments: 'Missing keyboard and mouse',
                        updatedBy: employees[0]._id,
                        updatedAt: new Date('2025-12-02'),
                    },
                ],
                equipmentList: [
                    {
                        name: 'Laptop MacBook Pro',
                        returned: true,
                        condition: 'Good',
                    },
                    {
                        name: 'Keyboard',
                        returned: false,
                    },
                    {
                        name: 'Mouse',
                        returned: false,
                    },
                ],
                cardReturned: true,
            },
            {
                terminationId: terminations[0]._id,
                items: [
                    {
                        department: 'Admin',
                        status: ApprovalStatus.APPROVED,
                        comments: 'Office key returned',
                        updatedBy: employees[3]._id,
                        updatedAt: new Date('2025-11-27'),
                    },
                ],
                equipmentList: [],
                cardReturned: true,
            },
        ]);
        console.log(`✅ Created ${clearanceChecklists.length} clearance checklists\n`);

        // ============================================================
        // SEED TIME MANAGEMENT - SHIFT TYPES
        // ============================================================
        console.log('⏰ Seeding Shift Types...');
        const shiftTypes = await shiftTypeModel.insertMany([
            {
                name: 'Regular Day Shift',
                description: 'Standard 8-hour day shift',
                isActive: true,
            },
            {
                name: 'Night Shift',
                description: 'Overnight shift with premium pay',
                isActive: true,
            },
            {
                name: 'Flexible Shift',
                description: 'Flexible working hours',
                isActive: true,
            },
            {
                name: 'Split Shift',
                description: 'Shift with break in between',
                isActive: true,
            },
            {
                name: 'Weekend Shift',
                description: 'Saturday and Sunday shifts',
                isActive: true,
            },
        ]);
        console.log(`✅ Created ${shiftTypes.length} shift types\n`);

        // ============================================================
        // SEED TIME MANAGEMENT - SHIFTS
        // ============================================================
        console.log('🕐 Seeding Shifts...');
        const shifts = await shiftModel.insertMany([
            {
                name: 'Morning Shift',
                shiftType: shiftTypes[0]._id,
                startTime: '08:00',
                endTime: '16:00',
                punchPolicy: PunchPolicy.FIRST_LAST,
                graceInMinutes: 15,
                graceOutMinutes: 15,
                requiresApprovalForOvertime: true,
                active: true,
            },
            {
                name: 'Evening Shift',
                shiftType: shiftTypes[0]._id,
                startTime: '16:00',
                endTime: '00:00',
                punchPolicy: PunchPolicy.FIRST_LAST,
                graceInMinutes: 10,
                graceOutMinutes: 10,
                requiresApprovalForOvertime: true,
                active: true,
            },
            {
                name: 'Night Shift',
                shiftType: shiftTypes[1]._id,
                startTime: '00:00',
                endTime: '08:00',
                punchPolicy: PunchPolicy.FIRST_LAST,
                graceInMinutes: 20,
                graceOutMinutes: 20,
                requiresApprovalForOvertime: false,
                active: true,
            },
            {
                name: 'Flexible Hours',
                shiftType: shiftTypes[2]._id,
                startTime: '09:00',
                endTime: '17:00',
                punchPolicy: PunchPolicy.MULTIPLE,
                graceInMinutes: 30,
                graceOutMinutes: 30,
                requiresApprovalForOvertime: true,
                active: true,
            },
            {
                name: 'Weekend Day',
                shiftType: shiftTypes[4]._id,
                startTime: '10:00',
                endTime: '18:00',
                punchPolicy: PunchPolicy.FIRST_LAST,
                graceInMinutes: 15,
                graceOutMinutes: 15,
                requiresApprovalForOvertime: false,
                active: true,
            },
        ]);
        console.log(`✅ Created ${shifts.length} shifts\n`);

        // ============================================================
        // SEED TIME MANAGEMENT - HOLIDAYS
        // ============================================================
        console.log('🎉 Seeding Holidays...');
        const holidays = await holidayModel.insertMany([
            {
                type: HolidayType.NATIONAL,
                startDate: new Date('2026-01-01'),
                name: 'New Year\'s Day',
                active: true,
            },
            {
                type: HolidayType.NATIONAL,
                startDate: new Date('2026-07-04'),
                name: 'Independence Day',
                active: true,
            },
            {
                type: HolidayType.NATIONAL,
                startDate: new Date('2026-12-25'),
                name: 'Christmas Day',
                active: true,
            },
            {
                type: HolidayType.NATIONAL,
                startDate: new Date('2026-05-01'),
                name: 'Labor Day',
                active: true,
            },
            {
                type: HolidayType.ORGANIZATIONAL,
                startDate: new Date('2026-11-26'),
                name: 'Company Anniversary',
                active: true,
            },
        ]);
        console.log(`✅ Created ${holidays.length} holidays\n`);

        // ============================================================
        // SEED TIME MANAGEMENT - SHIFT ASSIGNMENTS
        // ============================================================
        console.log('📋 Seeding Shift Assignments...');
        const shiftAssignments = await shiftAssignmentModel.insertMany([
            {
                employeeId: employees[0]._id,
                shiftId: shifts[0]._id,
                startDate: new Date('2026-01-01'),
                endDate: new Date('2026-12-31'),
                status: 'APPROVED',
            },
            {
                employeeId: employees[1]._id,
                shiftId: shifts[0]._id,
                startDate: new Date('2026-01-01'),
                status: 'APPROVED',
            },
            {
                employeeId: employees[2]._id,
                shiftId: shifts[3]._id,
                startDate: new Date('2026-01-01'),
                status: 'APPROVED',
            },
            {
                employeeId: employees[3]._id,
                shiftId: shifts[1]._id,
                startDate: new Date('2025-12-01'),
                endDate: new Date('2026-06-01'),
                status: 'APPROVED',
            },
            {
                employeeId: employees[4]._id,
                shiftId: shifts[2]._id,
                startDate: new Date('2024-03-01'),
                endDate: new Date('2025-11-30'),
                status: 'CANCELLED',
            },
        ]);
        console.log(`✅ Created ${shiftAssignments.length} shift assignments\n`);

        // ============================================================
        // SEED TIME MANAGEMENT - ATTENDANCE RECORDS
        // ============================================================
        console.log('✅ Seeding Attendance Records...');
        const attendanceRecords = await attendanceModel.insertMany([
            {
                employeeId: employees[0]._id,
                punches: [
                    { type: 'in', time: new Date('2025-12-02T08:00:00Z') },
                    { type: 'out', time: new Date('2025-12-02T16:30:00Z') },
                ],
                totalWorkMinutes: 510,
                hasMissedPunch: false,
                finalisedForPayroll: true,
            },
            {
                employeeId: employees[1]._id,
                punches: [
                    { type: 'in', time: new Date('2025-12-02T08:15:00Z') },
                    { type: 'out', time: new Date('2025-12-02T17:00:00Z') },
                ],
                totalWorkMinutes: 525,
                hasMissedPunch: false,
                finalisedForPayroll: true,
            },
            {
                employeeId: employees[2]._id,
                punches: [
                    { type: 'in', time: new Date('2025-12-02T09:00:00Z') },
                    { type: 'out', time: new Date('2025-12-02T18:00:00Z') },
                ],
                totalWorkMinutes: 540,
                hasMissedPunch: false,
                finalisedForPayroll: true,
            },
            {
                employeeId: employees[0]._id,
                punches: [
                    { type: 'in', time: new Date('2025-12-03T07:55:00Z') },
                ],
                totalWorkMinutes: 0,
                hasMissedPunch: true,
                finalisedForPayroll: false,
            },
            {
                employeeId: employees[3]._id,
                punches: [
                    { type: 'in', time: new Date('2025-12-02T16:00:00Z') },
                    { type: 'out', time: new Date('2025-12-03T00:00:00Z') },
                ],
                totalWorkMinutes: 480,
                hasMissedPunch: false,
                finalisedForPayroll: true,
            },
        ]);
        console.log(`✅ Created ${attendanceRecords.length} attendance records\n`);

        // ============================================================
        // SEED TIME MANAGEMENT - OVERTIME RULES
        // ============================================================
        console.log('⏳ Seeding Overtime Rules...');
        const overtimeRules = await overtimeRuleModel.insertMany([
            {
                name: 'Standard Overtime',
                overtimeThresholdMinutes: 480,
                overtimeMultiplier: 1.5,
                maxOvertimePerDay: 180,
                requiresApproval: true,
                isActive: true,
            },
            {
                name: 'Weekend Overtime',
                overtimeThresholdMinutes: 0,
                overtimeMultiplier: 2.0,
                maxOvertimePerDay: 240,
                requiresApproval: false,
                isActive: true,
            },
            {
                name: 'Holiday Overtime',
                overtimeThresholdMinutes: 0,
                overtimeMultiplier: 2.5,
                maxOvertimePerDay: 480,
                requiresApproval: false,
                isActive: true,
            },
            {
                name: 'Night Shift Overtime',
                overtimeThresholdMinutes: 480,
                overtimeMultiplier: 1.75,
                maxOvertimePerDay: 180,
                requiresApproval: true,
                isActive: true,
            },
            {
                name: 'Emergency Overtime',
                overtimeThresholdMinutes: 0,
                overtimeMultiplier: 3.0,
                maxOvertimePerDay: 360,
                requiresApproval: true,
                isActive: true,
            },
        ]);
        console.log(`✅ Created ${overtimeRules.length} overtime rules\n`);

        // ============================================================
        // SEED TIME MANAGEMENT - LATENESS RULES
        // ============================================================
        console.log('⌚ Seeding Lateness Rules...');
        const latenessRules = await latenessRuleModel.insertMany([
            {
                name: 'Standard Lateness Policy',
                thresholdMinutes: 15,
                penaltyAmount: 10,
                deductFromSalary: true,
                requiresJustification: true,
                isActive: true,
            },
            {
                name: 'Severe Lateness',
                thresholdMinutes: 30,
                penaltyAmount: 25,
                deductFromSalary: true,
                requiresJustification: true,
                isActive: true,
            },
            {
                name: 'Flexible Policy',
                thresholdMinutes: 30,
                penaltyAmount: 0,
                deductFromSalary: false,
                requiresJustification: false,
                isActive: true,
            },
            {
                name: 'Warning Only',
                thresholdMinutes: 10,
                penaltyAmount: 0,
                deductFromSalary: false,
                requiresJustification: true,
                isActive: true,
            },
            {
                name: 'Strict Policy',
                thresholdMinutes: 5,
                penaltyAmount: 50,
                deductFromSalary: true,
                requiresJustification: true,
                isActive: false,
            },
        ]);
        console.log(`✅ Created ${latenessRules.length} lateness rules\n`);

        // ============================================================
        // SEED TIME MANAGEMENT - TIME EXCEPTIONS
        // ============================================================
        console.log('⚠️ Seeding Time Exceptions...');
        const timeExceptions = await timeExceptionModel.insertMany([
            {
                employeeId: employees[0]._id,
                type: TimeExceptionType.LATE,
                attendanceRecordId: attendanceRecords[0]._id,
                assignedTo: employees[1]._id,
                status: 'RESOLVED',
                reason: '15 minutes late due to traffic',
            },
            {
                employeeId: employees[1]._id,
                type: TimeExceptionType.MISSED_PUNCH,
                attendanceRecordId: attendanceRecords[1]._id,
                assignedTo: employees[1]._id,
                status: 'OPEN',
                reason: 'Forgot to clock out',
            },
            {
                employeeId: employees[2]._id,
                type: TimeExceptionType.OVERTIME_REQUEST,
                attendanceRecordId: attendanceRecords[2]._id,
                assignedTo: employees[1]._id,
                status: 'APPROVED',
                reason: 'Worked 2 hours overtime without approval',
            },
            {
                employeeId: employees[3]._id,
                type: TimeExceptionType.EARLY_LEAVE,
                attendanceRecordId: attendanceRecords[4]._id,
                assignedTo: employees[1]._id,
                status: 'RESOLVED',
                reason: 'Left 30 minutes early',
            },
            {
                employeeId: employees[0]._id,
                type: TimeExceptionType.MISSED_PUNCH,
                attendanceRecordId: attendanceRecords[3]._id,
                assignedTo: employees[1]._id,
                status: 'PENDING',
                reason: 'No show, no notification',
            },
        ]);
        console.log(`✅ Created ${timeExceptions.length} time exceptions\n`);

        // ============================================================
        // SEED TIME MANAGEMENT - ATTENDANCE CORRECTIONS
        // ============================================================
        console.log('📝 Seeding Attendance Correction Requests...');
        const attendanceCorrections = await attendanceCorrectionModel.insertMany([
            {
                employeeId: employees[0]._id,
                attendanceRecord: attendanceRecords[3]._id,
                reason: 'System error, forgot to punch out',
                status: CorrectionRequestStatus.SUBMITTED,
            },
            {
                employeeId: employees[1]._id,
                attendanceRecord: attendanceRecords[1]._id,
                reason: 'Was already at desk, forgot to punch',
                status: CorrectionRequestStatus.APPROVED,
            },
            {
                employeeId: employees[2]._id,
                attendanceRecord: attendanceRecords[2]._id,
                reason: 'Manager approved flexible hours',
                status: CorrectionRequestStatus.APPROVED,
            },
            {
                employeeId: employees[3]._id,
                attendanceRecord: attendanceRecords[4]._id,
                reason: 'Manager verbally approved overtime',
                status: CorrectionRequestStatus.REJECTED,
            },
            {
                employeeId: employees[0]._id,
                attendanceRecord: attendanceRecords[0]._id,
                reason: 'Calculation error in system',
                status: CorrectionRequestStatus.IN_REVIEW,
            },
        ]);
        console.log(`✅ Created ${attendanceCorrections.length} attendance correction requests\n`);

        // ============================================================
        // SEED PAYROLL CONFIGURATION - PAY GRADES
        // ============================================================
        console.log('💰 Seeding Pay Grades...');
        const payGrades = await payGradeModel.insertMany([
            {
                grade: 'Junior Software Engineer',
                baseSalary: 60000,
                grossSalary: 70000,
                status: 'approved',
                approvedBy: employees[1]._id,
                approvedAt: new Date('2025-11-01'),
            },
            {
                grade: 'Mid-Level Software Engineer',
                baseSalary: 80000,
                grossSalary: 95000,
                status: 'approved',
                approvedBy: employees[1]._id,
                approvedAt: new Date('2025-11-01'),
            },
            {
                grade: 'Senior Software Engineer',
                baseSalary: 100000,
                grossSalary: 120000,
                status: 'approved',
                approvedBy: employees[1]._id,
                approvedAt: new Date('2025-11-01'),
            },
            {
                grade: 'HR Specialist',
                baseSalary: 55000,
                grossSalary: 65000,
                status: 'approved',
                approvedBy: employees[1]._id,
                approvedAt: new Date('2025-11-01'),
            },
            {
                grade: 'Senior Accountant',
                baseSalary: 75000,
                grossSalary: 90000,
                status: 'draft',
            },
        ]);
        console.log(`✅ Created ${payGrades.length} pay grades\n`);

        // ============================================================
        // SEED PAYROLL CONFIGURATION - ALLOWANCES
        // ============================================================
        console.log('💵 Seeding Allowances...');
        const allowances = await allowanceModel.insertMany([
            {
                name: 'Housing Allowance',
                amount: 1000,
                status: ConfigStatus.APPROVED,
            },
            {
                name: 'Transportation Allowance',
                amount: 500,
                status: ConfigStatus.APPROVED,
            },
            {
                name: 'Meal Allowance',
                amount: 300,
                status: ConfigStatus.APPROVED,
            },
            {
                name: 'Performance Bonus',
                amount: 1500,
                status: ConfigStatus.APPROVED,
            },
            {
                name: 'Remote Work Allowance',
                amount: 200,
                status: ConfigStatus.DRAFT,
            },
        ]);
        console.log(`✅ Created ${allowances.length} allowances\n`);

        // ============================================================
        // SEED PAYROLL CONFIGURATION - PAY TYPES
        // ============================================================
        console.log('💳 Seeding Pay Types...');
        const payTypes = await payTypeModel.insertMany([
            {
                type: 'Monthly Salary',
                amount: 8000,
                status: ConfigStatus.APPROVED,
            },
            {
                type: 'Hourly Wage',
                amount: 6500,
                status: ConfigStatus.APPROVED,
            },
            {
                type: 'Commission',
                amount: 7000,
                status: ConfigStatus.APPROVED,
            },
            {
                type: 'Bonus',
                amount: 10000,
                status: ConfigStatus.APPROVED,
            },
            {
                type: 'Overtime',
                amount: 6000,
                status: ConfigStatus.DRAFT,
            },
        ]);
        console.log(`✅ Created ${payTypes.length} pay types\n`);

        // ============================================================
        // SEED PAYROLL CONFIGURATION - TAX RULES
        // ============================================================
        console.log('📊 Seeding Tax Rules...');
        const taxRules = await taxRuleModel.insertMany([
            {
                name: 'Standard Tax - 0-50K',
                description: 'Tax bracket for income 0-50K',
                rate: 10,
                status: ConfigStatus.APPROVED,
            },
            {
                name: 'Standard Tax - 50K-100K',
                description: 'Tax bracket for income 50K-100K',
                rate: 20,
                status: ConfigStatus.APPROVED,
            },
            {
                name: 'Standard Tax - 100K-150K',
                description: 'Tax bracket for income 100K-150K',
                rate: 30,
                status: ConfigStatus.APPROVED,
            },
            {
                name: 'Standard Tax - 150K-200K',
                description: 'Tax bracket for income 150K-200K',
                rate: 35,
                status: ConfigStatus.APPROVED,
            },
            {
                name: 'Standard Tax - 200K+',
                description: 'Tax bracket for income 200K+',
                rate: 40,
                status: ConfigStatus.DRAFT,
            },
        ]);
        console.log(`✅ Created ${taxRules.length} tax rules\n`);

        // ============================================================
        // SEED PAYROLL CONFIGURATION - INSURANCE BRACKETS
        // ============================================================
        console.log('🏥 Seeding Insurance Brackets...');
        const insuranceBrackets = await insuranceBracketModel.insertMany([
            {
                name: 'Basic Health Insurance',
                amount: 300,
                minSalary: 0,
                maxSalary: 60000,
                employeeRate: 5,
                employerRate: 10,
                status: ConfigStatus.APPROVED,
            },
            {
                name: 'Standard Health Insurance',
                amount: 450,
                minSalary: 60001,
                maxSalary: 100000,
                employeeRate: 5,
                employerRate: 10,
                status: ConfigStatus.APPROVED,
            },
            {
                name: 'Premium Health Insurance',
                amount: 600,
                minSalary: 100001,
                maxSalary: 150000,
                employeeRate: 5,
                employerRate: 10,
                status: ConfigStatus.APPROVED,
            },
            {
                name: 'Executive Health Insurance',
                amount: 750,
                minSalary: 150001,
                maxSalary: 999999999,
                employeeRate: 5,
                employerRate: 10,
                status: ConfigStatus.APPROVED,
            },
            {
                name: 'Dental Insurance',
                amount: 100,
                minSalary: 0,
                maxSalary: 999999999,
                employeeRate: 2,
                employerRate: 2,
                status: ConfigStatus.DRAFT,
            },
        ]);
        console.log(`✅ Created ${insuranceBrackets.length} insurance brackets\n`);

        // ============================================================
        // SEED PAYROLL EXECUTION - PAYROLL RUNS
        // ============================================================
        console.log('🏃 Seeding Payroll Runs...');
        const payrollRunsRecords = await payrollRunsModel.insertMany([
            {
                runId: 'PR-2025-11',
                payrollPeriod: new Date('2025-11-30'),
                status: PayRollStatus.APPROVED,
                entity: 'Company ABC',
                employees: 5,
                exceptions: 0,
                totalnetpay: 340000,
                payrollSpecialistId: employees[1]._id,
                paymentStatus: PayRollPaymentStatus.PAID,
                payrollManagerId: employees[1]._id,
                financeStaffId: employees[1]._id,
                managerApprovalDate: new Date('2025-12-04'),
                financeApprovalDate: new Date('2025-12-05'),
            },
            {
                runId: 'PR-2025-12',
                payrollPeriod: new Date('2025-12-31'),
                status: PayRollStatus.DRAFT,
                entity: 'Company ABC',
                employees: 5,
                exceptions: 1,
                totalnetpay: 0,
                payrollSpecialistId: employees[1]._id,
                paymentStatus: PayRollPaymentStatus.PENDING,
            },
            {
                runId: 'PR-2025-10',
                payrollPeriod: new Date('2025-10-31'),
                status: PayRollStatus.APPROVED,
                entity: 'Company ABC',
                employees: 5,
                exceptions: 0,
                totalnetpay: 336000,
                payrollSpecialistId: employees[1]._id,
                paymentStatus: PayRollPaymentStatus.PAID,
                payrollManagerId: employees[1]._id,
                financeStaffId: employees[1]._id,
                managerApprovalDate: new Date('2025-11-04'),
                financeApprovalDate: new Date('2025-11-05'),
            },
            {
                runId: 'PR-2026-01',
                payrollPeriod: new Date('2026-01-31'),
                status: PayRollStatus.DRAFT,
                entity: 'Company ABC',
                employees: 5,
                exceptions: 0,
                totalnetpay: 0,
                payrollSpecialistId: employees[1]._id,
                paymentStatus: PayRollPaymentStatus.PENDING,
            },
            {
                runId: 'PR-2025-09',
                payrollPeriod: new Date('2025-09-30'),
                status: PayRollStatus.LOCKED,
                entity: 'Company ABC',
                employees: 5,
                exceptions: 0,
                totalnetpay: 332000,
                payrollSpecialistId: employees[1]._id,
                paymentStatus: PayRollPaymentStatus.PAID,
                payrollManagerId: employees[1]._id,
                financeStaffId: employees[1]._id,
            },
        ]);
        console.log(`✅ Created ${payrollRunsRecords.length} payroll runs\n`);

        // ============================================================
        // SEED PAYROLL EXECUTION - EMPLOYEE PAYROLL DETAILS
        // ============================================================
        console.log('💼 Seeding Employee Payroll Details...');
        const employeePayrollDetailsRecords = await employeePayrollDetailsModel.insertMany([
            {
                employeeId: employees[0]._id,
                baseSalary: 85000,
                allowances: 1800,
                deductions: 17360,
                netSalary: 69440,
                netPay: 69440,
                bankStatus: 'valid',
                payrollRunId: payrollRunsRecords[0]._id,
            },
            {
                employeeId: employees[1]._id,
                baseSalary: 75000,
                allowances: 1500,
                deductions: 15300,
                netSalary: 61200,
                netPay: 61200,
                bankStatus: 'valid',
                payrollRunId: payrollRunsRecords[0]._id,
            },
            {
                employeeId: employees[2]._id,
                baseSalary: 100000,
                allowances: 2000,
                deductions: 20400,
                netSalary: 81600,
                netPay: 81600,
                bankStatus: 'valid',
                bonus: 10000,
                payrollRunId: payrollRunsRecords[0]._id,
            },
            {
                employeeId: employees[3]._id,
                baseSalary: 70000,
                allowances: 1400,
                deductions: 14280,
                netSalary: 57120,
                netPay: 57120,
                bankStatus: 'missing',
                exceptions: 'Bank details not provided',
                payrollRunId: payrollRunsRecords[0]._id,
            },
            {
                employeeId: employees[0]._id,
                baseSalary: 85000,
                allowances: 1800,
                deductions: 17360,
                netSalary: 69440,
                netPay: 69440,
                bankStatus: 'valid',
                payrollRunId: payrollRunsRecords[1]._id,
            },
        ]);
        console.log(`✅ Created ${employeePayrollDetailsRecords.length} employee payroll details\n`);

        // ============================================================
        // SEED PAYROLL EXECUTION - PAYSLIPS
        // ============================================================
        console.log('📄 Seeding Payslips...');
        // let payslips = [];
        // try {
        //     payslips = await payslipModel.insertMany([
        //         {
        //             employeeId: employees[0]._id,
        //             payrollRunId: payrollRunsRecords[0]._id,
        //             totalGrossSalary: 86800,
        //             totaDeductions: 17360,
        //             netPay: 69440,
        //             paymentStatus: 'paid',
        //         },
        //         {
        //             employeeId: employees[1]._id,
        //             payrollRunId: payrollRunsRecords[0]._id,
        //             totalGrossSalary: 76500,
        //             totaDeductions: 15300,
        //             netPay: 61200,
        //             paymentStatus: 'paid',
        //         },
        //         {
        //             employeeId: employees[2]._id,
        //             payrollRunId: payrollRunsRecords[0]._id,
        //             totalGrossSalary: 112000,
        //             totaDeductions: 20400,
        //             netPay: 81600,
        //             paymentStatus: 'paid',
        //         },
        //         {
        //             employeeId: employees[3]._id,
        //             payrollRunId: payrollRunsRecords[0]._id,
        //             totalGrossSalary: 71400,
        //             totaDeductions: 14280,
        //             netPay: 57120,
        //             paymentStatus: 'pending',
        //         },
        //         {
        //             employeeId: employees[0]._id,
        //             payrollRunId: payrollRunsRecords[2]._id,
        //             totalGrossSalary: 86800,
        //             totaDeductions: 17360,
        //             netPay: 69440,
        //             paymentStatus: 'paid',
        //         },
        //     ], { ordered: false });
        // } catch (error: any) {
        //     // Handle duplicate key errors from unique index on embedded allowance name
        //     if (error.code === 11000 && error.insertedDocs) {
        //         payslips = error.insertedDocs;
        //         console.log(`⚠️  Warning: Some payslips had duplicate key errors (embedded schema index issue), but ${payslips.length} were created`);
        //     } else {
        //         throw error;
        //     }
        // }
        // console.log(`✅ Created ${payslips.length} payslips\n`);

        // ============================================================
        // SEED PAYROLL EXECUTION - SIGNING BONUSES
        // ============================================================
        // console.log('🎁 Seeding Signing Bonuses...');
        // const signingBonuses = await employeeSigningBonusModel.insertMany([
        //     {
        //         employeeId: employees[0]._id,
        //         bonusAmount: 5000,
        //         paymentDate: new Date('2026-01-15'),
        //         status: 'paid',
        //         contractId: contracts[0]._id,
        //     },
        //     {
        //         employeeId: employees[1]._id,
        //         bonusAmount: 3000,
        //         paymentDate: new Date('2026-02-01'),
        //         status: 'pending',
        //         contractId: contracts[1]._id,
        //     },
        //     {
        //         employeeId: employees[2]._id,
        //         bonusAmount: 10000,
        //         paymentDate: new Date('2026-01-20'),
        //         status: 'paid',
        //         contractId: contracts[2]._id,
        //     },
        //     {
        //         employeeId: employees[3]._id,
        //         bonusAmount: 2000,
        //         paymentDate: new Date('2025-06-01'),
        //         status: 'paid',
        //         contractId: contracts[0]._id,
        //     },
        //     {
        //         employeeId: employees[0]._id,
        //         bonusAmount: 4500,
        //         paymentDate: new Date('2026-01-15'),
        //         status: 'processing',
        //         contractId: contracts[3]._id,
        //     },
        // ]);
        // console.log(`✅ Created ${signingBonuses.length} signing bonuses\n`);

        // ============================================================
        // SEED PAYROLL EXECUTION - TERMINATION RESIGNATION
        // ============================================================
        // console.log('📋 Seeding Employee Termination/Resignation Records...');
        // const terminationResignations = await employeeTerminationModel.insertMany([
        //     {
        //         employeeId: employees[4]._id,
        //         terminationDate: new Date('2025-11-30'),
        //         finalPayAmount: 5200,
        //         unpaidLeaveDays: 5,
        //         severanceAmount: 2000,
        //         status: 'paid',
        //         paidAt: new Date('2025-12-05'),
        //     },
        //     {
        //         employeeId: employees[3]._id,
        //         terminationDate: new Date('2025-12-31'),
        //         finalPayAmount: 6100,
        //         unpaidLeaveDays: 8,
        //         severanceAmount: 0,
        //         status: 'pending',
        //     },
        //     {
        //         employeeId: employees[2]._id,
        //         terminationDate: new Date('2026-03-31'),
        //         finalPayAmount: 0,
        //         unpaidLeaveDays: 0,
        //         severanceAmount: 10000,
        //         status: 'pending',
        //     },
        //     {
        //         employeeId: employees[4]._id,
        //         terminationDate: new Date('2025-11-30'),
        //         finalPayAmount: 5000,
        //         unpaidLeaveDays: 4,
        //         severanceAmount: 2500,
        //         status: 'processing',
        //     },
        //     {
        //         employeeId: employees[0]._id,
        //         terminationDate: new Date('2026-01-31'),
        //         finalPayAmount: 0,
        //         unpaidLeaveDays: 0,
        //         severanceAmount: 0,
        //         status: 'cancelled',
        //     },
        // ]);
        // console.log(`✅ Created ${terminationResignations.length} termination/resignation records\n`);

        // ============================================================
        // SEED PAYROLL TRACKING - CLAIMS
        // ============================================================
        console.log('📝 Seeding Claims...');
        const claims = await claimModel.insertMany([
            {
                employeeId: employees[0]._id,
                claimType: 'medical',
                claimAmount: 500,
                claimDate: new Date('2025-11-20'),
                status: 'approved',
                approvedBy: employees[1]._id,
                approvedAt: new Date('2025-11-22'),
                description: 'Medical expenses - dental treatment',
            },
            {
                employeeId: employees[1]._id,
                claimType: 'travel',
                claimAmount: 300,
                claimDate: new Date('2025-11-25'),
                status: 'pending',
                description: 'Business travel to client site',
            },
            {
                employeeId: employees[2]._id,
                claimType: 'equipment',
                claimAmount: 1200,
                claimDate: new Date('2025-11-18'),
                status: 'approved',
                approvedBy: employees[1]._id,
                approvedAt: new Date('2025-11-20'),
                description: 'Home office equipment - monitor and keyboard',
            },
            {
                employeeId: employees[3]._id,
                claimType: 'training',
                claimAmount: 800,
                claimDate: new Date('2025-11-15'),
                status: 'rejected',
                approvedBy: employees[1]._id,
                approvedAt: new Date('2025-11-17'),
                description: 'Online course certification',
                rejectionReason: 'Not pre-approved by manager',
            },
            {
                employeeId: employees[0]._id,
                claimType: 'medical',
                claimAmount: 200,
                claimDate: new Date('2025-12-01'),
                status: 'pending',
                description: 'Prescription medication',
            },
        ]);
        console.log(`✅ Created ${claims.length} claims\n`);

        // ============================================================
        // SEED PAYROLL TRACKING - DISPUTES
        // ============================================================
        console.log('⚖️ Seeding Disputes...');
        const disputes = await disputeModel.insertMany([
            {
                employeeId: employees[0]._id,
                payrollRunId: payrollRunsRecords[0]._id,
                disputeType: 'incorrect_amount',
                disputeAmount: 500,
                disputeDate: new Date('2025-12-06'),
                status: 'under_review',
                description: 'Missing overtime payment for November 20th',
            },
            {
                employeeId: employees[1]._id,
                payrollRunId: payrollRunsRecords[0]._id,
                disputeType: 'missing_allowance',
                disputeAmount: 300,
                disputeDate: new Date('2025-12-07'),
                status: 'resolved',
                resolvedBy: employees[1]._id,
                resolvedAt: new Date('2025-12-08'),
                description: 'Transportation allowance not included',
                resolution: 'Allowance added to next payroll',
            },
            {
                employeeId: employees[2]._id,
                payrollRunId: payrollRunsRecords[2]._id,
                disputeType: 'incorrect_deduction',
                disputeAmount: 200,
                disputeDate: new Date('2025-11-10'),
                status: 'resolved',
                resolvedBy: employees[1]._id,
                resolvedAt: new Date('2025-11-12'),
                description: 'Incorrect tax deduction',
                resolution: 'Tax calculation corrected and refunded',
            },
            {
                employeeId: employees[3]._id,
                payrollRunId: payrollRunsRecords[0]._id,
                disputeType: 'late_payment',
                disputeAmount: 0,
                disputeDate: new Date('2025-12-08'),
                status: 'pending',
                description: 'Salary not received on pay date',
            },
            {
                employeeId: employees[0]._id,
                payrollRunId: payrollRunsRecords[2]._id,
                disputeType: 'incorrect_amount',
                disputeAmount: 1000,
                disputeDate: new Date('2025-11-06'),
                status: 'rejected',
                resolvedBy: employees[1]._id,
                resolvedAt: new Date('2025-11-08'),
                description: 'Claimed signing bonus not paid',
                resolution: 'Bonus payment scheduled for next payroll cycle',
            },
        ]);
        console.log(`✅ Created ${disputes.length} disputes\n`);

        // ============================================================
        // SEED PAYROLL TRACKING - REFUNDS
        // ============================================================
        console.log('💸 Seeding Refunds...');
        const refunds = await refundModel.insertMany([
            {
                employeeId: employees[0]._id,
                refundType: 'overpayment',
                refundAmount: 250,
                refundDate: new Date('2025-11-15'),
                status: 'processed',
                processedBy: employees[1]._id,
                processedAt: new Date('2025-11-20'),
                description: 'Overpayment in October payroll',
            },
            {
                employeeId: employees[1]._id,
                refundType: 'tax_adjustment',
                refundAmount: 150,
                refundDate: new Date('2025-11-18'),
                status: 'approved',
                processedBy: employees[1]._id,
                description: 'Tax refund due to adjustment',
            },
            {
                employeeId: employees[2]._id,
                refundType: 'correction',
                refundAmount: 500,
                refundDate: new Date('2025-11-20'),
                status: 'processed',
                processedBy: employees[1]._id,
                processedAt: new Date('2025-11-25'),
                description: 'Correction for disputed deduction',
            },
            {
                employeeId: employees[3]._id,
                refundType: 'loan_repayment',
                refundAmount: 1000,
                refundDate: new Date('2025-11-22'),
                status: 'pending',
                description: 'Company loan repayment refund',
            },
            {
                employeeId: employees[0]._id,
                refundType: 'benefits_adjustment',
                refundAmount: 100,
                refundDate: new Date('2025-12-01'),
                status: 'rejected',
                processedBy: employees[1]._id,
                processedAt: new Date('2025-12-02'),
                description: 'Benefits adjustment request',
                rejectionReason: 'No overpayment found in records',
            },
        ]);
        console.log(`✅ Created ${refunds.length} refunds\n`);

        // ============================================================
        // SEED LEAVE TYPES
        // ============================================================
        console.log('🏖️ Seeding Leave Types...');
        const leaveTypes = await leaveTypeModel.insertMany([
            {
                leaveTypeName: 'Annual Leave',
                leaveTypeCode: 'ANNUAL',
                description: 'Paid vacation days',
                defaultDaysPerYear: 20,
                maxCarryForward: 5,
                isPaid: true,
                requiresApproval: true,
                allowNegativeBalance: false,
                isActive: true,
            },
            {
                leaveTypeName: 'Sick Leave',
                leaveTypeCode: 'SICK',
                description: 'Medical leave for illness',
                defaultDaysPerYear: 10,
                maxCarryForward: 0,
                isPaid: true,
                requiresApproval: true,
                requiresDocumentation: true,
                allowNegativeBalance: false,
                isActive: true,
            },
            {
                leaveTypeName: 'Maternity Leave',
                leaveTypeCode: 'MATERNITY',
                description: 'Maternity leave for new mothers',
                defaultDaysPerYear: 90,
                maxCarryForward: 0,
                isPaid: true,
                requiresApproval: true,
                requiresDocumentation: true,
                allowNegativeBalance: false,
                isActive: true,
            },
            {
                leaveTypeName: 'Paternity Leave',
                leaveTypeCode: 'PATERNITY',
                description: 'Paternity leave for new fathers',
                defaultDaysPerYear: 15,
                maxCarryForward: 0,
                isPaid: true,
                requiresApproval: true,
                requiresDocumentation: true,
                allowNegativeBalance: false,
                isActive: true,
            },
            {
                leaveTypeName: 'Unpaid Leave',
                leaveTypeCode: 'UNPAID',
                description: 'Leave without pay',
                defaultDaysPerYear: 0,
                maxCarryForward: 0,
                isPaid: false,
                requiresApproval: true,
                allowNegativeBalance: true,
                isActive: true,
            },
        ]);
        console.log(`✅ Created ${leaveTypes.length} leave types\n`);

        // ============================================================
        // SUMMARY
        // ============================================================
        console.log('\n🎉 Database seeding completed successfully!\n');
        console.log('Summary:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📁 RECRUITMENT & EMPLOYEE:');
        console.log(`  ✅ Departments: ${departments.length}`);
        console.log(`  ✅ Positions: ${positions.length}`);
        console.log(`  ✅ Candidates: ${candidates.length}`);
        console.log(`  ✅ Employees: ${employees.length}`);
        console.log(`  ✅ Job Templates: ${jobTemplates.length}`);
        console.log(`  ✅ Job Requisitions: ${jobRequisitions.length}`);
        console.log(`  ✅ Applications: ${applications.length}`);
        console.log(`  ✅ Application History: ${applicationHistory.length}`);
        console.log(`  ✅ Referrals: ${referrals.length}`);
        console.log(`  ✅ Interviews: ${interviews.length}`);
        console.log(`  ✅ Assessments: ${assessments.length}`);
        console.log(`  ✅ Documents: ${documents.length}`);
        console.log(`  ✅ Offers: ${offers.length}`);
        console.log(`  ✅ Contracts: ${contracts.length}`);
        console.log('');
        console.log('🎯 ONBOARDING & OFFBOARDING:');
        console.log(`  ✅ Onboarding: ${onboardings.length}`);
        console.log(`  ✅ Terminations: ${terminations.length}`);
        console.log(`  ✅ Clearance Checklists: ${clearanceChecklists.length}`);
        console.log('');
        console.log('⏰ TIME MANAGEMENT:');
        console.log(`  ✅ Shift Types: ${shiftTypes.length}`);
        console.log(`  ✅ Shifts: ${shifts.length}`);
        console.log(`  ✅ Shift Assignments: ${shiftAssignments.length}`);
        console.log(`  ✅ Attendance Records: ${attendanceRecords.length}`);
        console.log(`  ✅ Holidays: ${holidays.length}`);
        console.log(`  ✅ Overtime Rules: ${overtimeRules.length}`);
        console.log(`  ✅ Lateness Rules: ${latenessRules.length}`);
        console.log(`  ✅ Time Exceptions: ${timeExceptions.length}`);
        console.log(`  ✅ Attendance Corrections: ${attendanceCorrections.length}`);
        console.log('');
        console.log('💰 PAYROLL CONFIGURATION:');
        console.log(`  ✅ Pay Grades: ${payGrades.length}`);
        console.log(`  ✅ Allowances: ${allowances.length}`);
        console.log(`  ✅ Pay Types: ${payTypes.length}`);
        console.log(`  ✅ Tax Rules: ${taxRules.length}`);
        console.log(`  ✅ Insurance Brackets: ${insuranceBrackets.length}`);
        console.log('');
        console.log('💼 PAYROLL EXECUTION:');
        console.log(`  ✅ Payroll Runs: ${payrollRunsRecords.length}`);
        console.log(`  ✅ Employee Payroll Details: ${employeePayrollDetailsRecords.length}`);
        //console.log(`  ✅ Payslips: ${payslips.length}`);
        //console.log(`  ✅ Signing Bonuses: ${signingBonuses.length}`);
        //console.log(`  ✅ Termination/Resignation: ${terminationResignations.length}`);
        //console.log('');
        console.log('📊 PAYROLL TRACKING:');
        console.log(`  ✅ Claims: ${claims.length}`);
        console.log(`  ✅ Disputes: ${disputes.length}`);
        console.log(`  ✅ Refunds: ${refunds.length}`);
        console.log('');
        console.log('🏖️ LEAVE MANAGEMENT:');
        console.log(`  ✅ Leave Types: ${leaveTypes.length}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        const totalRecords =
            departments.length +
            positions.length +
            candidates.length +
            employees.length +
            jobTemplates.length +
            jobRequisitions.length +
            applications.length +
            applicationHistory.length +
            referrals.length +
            interviews.length +
            assessments.length +
            documents.length +
            offers.length +
            contracts.length +
            onboardings.length +
            terminations.length +
            clearanceChecklists.length +
            shiftTypes.length +
            shifts.length +
            shiftAssignments.length +
            attendanceRecords.length +
            holidays.length +
            overtimeRules.length +
            latenessRules.length +
            timeExceptions.length +
            attendanceCorrections.length +
            payGrades.length +
            allowances.length +
            payTypes.length +
            taxRules.length +
            insuranceBrackets.length +
            payrollRunsRecords.length +
            employeePayrollDetailsRecords.length +
            //payslips.length +
            //signingBonuses.length +
            //terminationResignations.length +
            claims.length +
            disputes.length +
            refunds.length +
            leaveTypes.length;

        console.log(`📊 Total records created: ${totalRecords}`);
        console.log(`✨ Your database is now populated with sample data!\n`);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    } finally {
        await app.close();
    }
}

bootstrap().catch((error) => {
    console.error('❌ Fatal error during seeding:', error);
    process.exit(1);
});

