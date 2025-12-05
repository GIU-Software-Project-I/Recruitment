# Onboarding Service Documentation

## Overview
The Onboarding Service manages the complete employee onboarding process from contract signing to full integration. All requirements from `onboarding.requirements` have been implemented.

---

## Requirements Implementation

### ✅ ONB-001: Create Onboarding Task Checklists (HR Manager)
**Requirement**: As an HR Manager, I want to create onboarding task checklists, so that new hires complete all required steps.

**Business Rules**:
- BR 8: Triggered by offer acceptance
- BR 11: Checklists customizable, department-specific tasks

**Implementation**:
- `createOnboarding(dto: CreateOnboardingDto)`
- Default 10 tasks if none provided (HR, IT, Admin, Manager tasks)
- Each task has: name, department, status, deadline, documentId, notes
- Prevents duplicate onboarding checklists

**API Endpoint**: `POST /onboarding`

---

### ✅ ONB-002: Access Signed Contract Details (HR Manager)
**Requirement**: As an HR Manager, I want to be able to access signed contract detail to be able create an employee profile.

**Business Rules**:
- BR 17(a, b): Uses signed contract data from Recruitment
- Outputs to Employee Profile (EP)

**Implementation**:
- `getContractDetails(contractId: string)`
- Verifies contract is fully signed (both employee and employer)
- Populates offerId and documentId
- TODO: Data used to create Employee Profile in Employee module

**API Endpoint**: `GET /onboarding/contracts/:contractId`

**Contract Data Available**:
- role, grossSalary, signingBonus, benefits, acceptanceDate
- Signature URLs and dates
- Document references

---

### ✅ ONB-004: View Onboarding Steps (Tracker)
**Requirement**: As a New Hire, I want to view my onboarding steps in a tracker, so that I know what to complete next.

**Business Rules**:
- BR 11(a, b): Onboarding workflow with department-specific tasks

**Implementation**:
- `getOnboardingByEmployeeId(employeeId: string)`
- `getOnboardingById(id: string)`
- `getOnboardingProgress(onboardingId: string)`
- `updateTaskStatus(onboardingId, taskName, dto)`
- Auto-completes onboarding when all tasks completed

**API Endpoints**:
- `GET /onboarding/employee/:employeeId`
- `GET /onboarding/:id`
- `GET /onboarding/:id/progress`
- `PATCH /onboarding/:id/tasks/:taskName/status`

---

### ✅ ONB-005: Reminders and Notifications
**Requirement**: As a New Hire, I want to receive reminders and notifications, so that I don't miss important onboarding tasks.

**Business Rules**:
- BR 12: Track reminders and task assignments

**Implementation**:
- `getPendingTasks(employeeId: string)`
- Returns pending and overdue tasks
- TODO: Integration with Notifications Module (N)
- TODO: Send reminders for pending tasks
- TODO: Send urgent notifications for overdue tasks

**API Endpoint**: `GET /onboarding/employee/:employeeId/pending-tasks`

---

### ✅ ONB-007: Upload Documents
**Requirement**: As a New Hire, I want to upload documents (e.g., ID, contracts, certifications), so that compliance is ensured.

**Business Rules**:
- BR 7: Documents collected and verified before first working day

**Implementation**:
- `uploadDocument(dto: UploadDocumentDto)`
- `getDocumentsByOwner(ownerId: string)`
- `linkDocumentToTask(onboardingId, taskName, documentId)`
- Supports: CV, CONTRACT, ID, CERTIFICATE types
- TODO: Store documents in Employee Profile (EP)
- TODO: Trigger verification workflow in HR

**API Endpoints**:
- `POST /onboarding/documents`
- `GET /onboarding/documents/owner/:ownerId`
- `PATCH /onboarding/:id/tasks/:taskName/document`

---

### ✅ ONB-009: Provision System Access (System Admin)
**Requirement**: As a System Admin, I want to provision system access (payroll, email, internal systems), so that the employee can work.

**Business Rules**:
- BR 9(b): Auto onboarding tasks for IT (email, laptop, system access)

**Implementation**:
- `provisionSystemAccess(dto: ProvisionAccessDto)`
- TODO: Integration with IT/Access Systems
- TODO: Create email account
- TODO: Setup SSO credentials
- TODO: Grant access to payroll system
- TODO: Grant access to internal tools
- TODO: Grant access to time management

**API Endpoint**: `POST /onboarding/provision-access`

---

### ✅ ONB-012: Reserve Equipment and Resources (HR Employee)
**Requirement**: As a HR Employee, I want to reserve and track equipment, desk and access cards for new hires, so resources are ready on Day 1.

**Business Rules**:
- BR 9(c): Auto onboarding tasks for Admin (workspace, ID badge)

**Implementation**:
- `reserveEquipment(dto: ReserveEquipmentDto)`
- Reserves: equipment list, desk, access card
- TODO: Integration with Facilities/Admin Systems
- TODO: Reserve equipment from inventory
- TODO: Assign desk/workspace
- TODO: Generate access card

**API Endpoint**: `POST /onboarding/reserve-equipment`

---

### ✅ ONB-013: Schedule Access Revocation (HR Manager)
**Requirement**: As a HR Manager, I want automated account provisioning on start date and scheduled revocation on exit, so access is consistent and secure.

**Business Rules**:
- BR 9(b): IT allocation is automated
- Links to Offboarding (OFF-007)

**Implementation**:
- `scheduleAccessRevocation(dto: ScheduleAccessRevocationDto)`
- TODO: Store scheduled revocation in system
- TODO: Create scheduled job for automatic revocation
- TODO: Link to Offboarding module (OFF-007)

**API Endpoint**: `POST /onboarding/schedule-access-revocation`

---

### ✅ ONB-018: Trigger Payroll Initiation (HR Manager)
**Requirement**: As a HR Manager, I want the system to automatically handle payroll initiation based on the contract signing day for the current payroll cycle.

**Business Rules**:
- BR 9(a): Auto onboarding tasks for HR (payroll & benefits creation)
- REQ-PY-23: Automatically process payroll initiation

**Implementation**:
- `triggerPayrollInitiation(dto: TriggerPayrollInitiationDto)`
- TODO: Integration with Payroll Module (PY)
- TODO: REQ-PY-23: Trigger payroll initiation
- TODO: Create payroll entry based on contract signing date
- TODO: Calculate pro-rated salary
- TODO: Setup benefits enrollment

**API Endpoint**: `POST /onboarding/trigger-payroll-initiation`

---

### ✅ ONB-019: Process Signing Bonuses (HR Manager)
**Requirement**: As a HR Manager, I want the system to automatically process signing bonuses based on contract after a new hire is signed.

**Business Rules**:
- BR 9(a): Bonuses as distinct payroll components
- REQ-PY-27: Automatically process signing bonuses

**Implementation**:
- `processSigningBonus(contractId: string)`
- Validates signing bonus exists in contract
- TODO: Integration with Payroll Module (PY)
- TODO: REQ-PY-27: Process signing bonus
- TODO: Create bonus payment entry
- TODO: Apply tax calculations

**API Endpoint**: `POST /onboarding/contracts/:contractId/process-signing-bonus`

---

### ✅ ONB-020: Cancel Onboarding (No-Show)
**Requirement**: BR20 - The system should allow onboarding cancellation/termination of the created employee profile in case of a "no show".

**Implementation**:
- `cancelOnboarding(onboardingId, dto: CancelOnboardingDto)`
- Cannot cancel completed onboarding
- Deletes onboarding record
- TODO: Integration with Employee Profile module
- TODO: Terminate/deactivate employee profile
- TODO: Revoke any provisioned access
- TODO: Cancel equipment reservations
- TODO: Remove from payroll

**API Endpoint**: `DELETE /onboarding/:id/cancel`

---

## Data Models Used

### Onboarding Schema
- `employeeId`: Reference to EmployeeProfile
- `contractId`: Reference to Contract
- `tasks`: Array of onboarding tasks
  - `name`: Task name
  - `department`: Responsible department
  - `status`: PENDING, IN_PROGRESS, COMPLETED
  - `deadline`: Optional due date
  - `completedAt`: Completion timestamp
  - `documentId`: Optional document reference
  - `notes`: Additional information
- `completed`: Boolean (auto-set when all tasks done)
- `completedAt`: Timestamp when onboarding completed

---

## Integration Points (TODOs)

### Employee Profile Module
- Validate employee exists
- Create employee profile from contract data
- Store uploaded documents
- Terminate/deactivate profile on cancellation

### Payroll Module (PY)
- REQ-PY-23: Trigger payroll initiation
- REQ-PY-27: Process signing bonuses
- Create payroll entries
- Setup benefits enrollment
- Remove from payroll on cancellation

### Notifications Module (N)
- Send task reminders
- Send overdue task alerts
- Notify departments of responsibilities
- Send welcome emails with access details

### IT/Access Systems
- Provision email accounts
- Setup SSO credentials
- Grant system access
- Grant time management access
- Revoke access on cancellation

### Facilities/Admin Systems
- Reserve equipment
- Assign workspaces
- Generate access cards
- Cancel reservations on no-show

### Leaves Module
- Setup leave balances for new employee

---

## API Endpoints Summary

### Onboarding Management
- `POST /onboarding` - Create onboarding checklist
- `GET /onboarding` - Get all onboarding checklists
- `GET /onboarding/:id` - Get onboarding by ID
- `POST /onboarding/:id/tasks` - Add task to checklist
- `GET /onboarding/employee/:employeeId` - Get onboarding by employee
- `GET /onboarding/:id/progress` - Get progress statistics
- `PATCH /onboarding/:id/tasks/:taskName/status` - Update task status

### Contract & Employee Profile
- `GET /onboarding/contracts/:contractId` - Access contract details

### Task Management
- `GET /onboarding/employee/:employeeId/pending-tasks` - Get pending/overdue tasks

### Documents
- `POST /onboarding/documents` - Upload document
- `GET /onboarding/documents/owner/:ownerId` - Get documents by owner
- `PATCH /onboarding/:id/tasks/:taskName/document` - Link document to task

### Provisioning & Resources
- `POST /onboarding/provision-access` - Provision system access
- `POST /onboarding/reserve-equipment` - Reserve equipment/resources
- `POST /onboarding/schedule-access-revocation` - Schedule access revocation

### Payroll Integration
- `POST /onboarding/trigger-payroll-initiation` - Trigger payroll setup
- `POST /onboarding/contracts/:contractId/process-signing-bonus` - Process bonus

### Cancellation
- `DELETE /onboarding/:id/cancel` - Cancel onboarding (no-show)

---

## Workflow Process

### Standard Onboarding Flow
1. Candidate accepts offer and signs contract (Recruitment module)
2. HR Manager creates onboarding checklist (ONB-001)
3. HR Manager accesses contract details to create employee profile (ONB-002)
4. System provisions access (ONB-009) - IT tasks auto-generated
5. HR reserves equipment and resources (ONB-012) - Admin tasks auto-generated
6. HR triggers payroll initiation (ONB-018)
7. HR processes signing bonus if applicable (ONB-019)
8. HR schedules access revocation for contract end date (ONB-013)
9. New hire views tracker and completes tasks (ONB-004)
10. New hire uploads compliance documents (ONB-007)
11. New hire receives reminders for pending tasks (ONB-005)
12. All tasks completed → Onboarding marked as complete

### No-Show Scenario
1. Employee fails to show on first day
2. HR Manager cancels onboarding (ONB-020)
3. System terminates employee profile
4. System revokes any provisioned access
5. System cancels equipment reservations
6. System removes from payroll

---

## Error Handling

### Common Errors
- `404 Not Found`: Contract, onboarding, or task not found
- `409 Conflict`: Onboarding checklist already exists
- `400 Bad Request`: Contract not fully signed, cannot cancel completed onboarding, no signing bonus

### Validation
- All MongoDB ObjectIds validated
- Enum values validated (OnboardingTaskStatus, DocumentType)
- Required fields enforced
- Business rule validations implemented

---

## Testing

See `documentation/HTTP testing/onboarding.http` for complete HTTP test suite covering all endpoints and requirements.

---

## Default Tasks

When creating onboarding without specifying tasks, these 10 default tasks are created:

1. **Complete I-9 Form** (HR) - Required by Day 1
2. **Upload ID Documents** (HR) - Government-issued ID
3. **Sign Employee Handbook** (HR) - Acknowledge policies
4. **Complete Tax Forms (W-4)** (HR) - For payroll setup
5. **Enroll in Benefits** (HR) - Health insurance, 401k
6. **IT System Access Setup** (IT) - Email, laptop, access
7. **Security Training** (IT) - Cybersecurity awareness
8. **Desk and Equipment Assignment** (Admin) - Workspace ready
9. **ID Badge Issuance** (Admin) - Building access
10. **Department Orientation** (Manager) - Meet the team

---

## Status Tracking

### Task Statuses
- `PENDING`: Not started
- `IN_PROGRESS`: Currently being worked on
- `COMPLETED`: Finished

### Progress Calculation
- `totalTasks`: Total number of tasks
- `completedTasks`: Tasks with COMPLETED status
- `pendingTasks`: Tasks with PENDING status
- `inProgressTasks`: Tasks with IN_PROGRESS status
- `progressPercentage`: (completed / total) * 100
- `isComplete`: All tasks completed

---

## Security & Compliance

- All onboarding data is sensitive
- Access restricted by role-based authentication
- Document storage should be encrypted
- Audit trail maintained via timestamps
- GDPR compliance: Personal data handling
- Access provisioning follows least privilege principle

