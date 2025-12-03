# Offboarding Service Documentation

## Overview
The Offboarding Service handles the complete employee separation process, whether through termination or resignation. All requirements from `offboarding.requirements` have been implemented.

---

## Requirements Implementation

### ✅ OFF-001: Termination Reviews (HR Manager)
**Requirement**: As an HR Manager, I want to initiate termination reviews based on warnings and performance data/manager requests.

**Business Rules**:
- BR 4: Employee separation needs effective date and clearly stated reason
- Termination reviews must follow due process

**Implementation**:
- `createTerminationRequest(dto: CreateTerminationRequestDto)`
- Validates contract exists
- Prevents duplicate active termination requests
- Status starts as `PENDING`
- TODO: Integration with Performance Management module for warnings/low scores

**API Endpoint**: `POST /offboarding/termination-requests`

---

### ✅ OFF-018: Resignation Requests (Employee)
**Requirement**: As an Employee, I want to request resignation with reasoning.

**Business Rules**:
- BR 6: Employee separation can be triggered by resignation
- Clearly identified approval workflow (Employee > Line Manager > Financial > HR)

**Implementation**:
- `createResignationRequest(dto: CreateResignationRequestDto)`
- Sets initiator automatically to `EMPLOYEE`
- Validates no existing active requests
- TODO: Trigger offboarding approval workflow

**API Endpoint**: `POST /offboarding/resignation-requests`

---

### ✅ OFF-019: Track Resignation Status (Employee)
**Requirement**: As an Employee, I want to track my resignation request status.

**Implementation**:
- `getResignationRequestByEmployeeId(employeeId: string)`
- Returns all resignation requests for the employee
- Sorted by creation date (newest first)

**API Endpoint**: `GET /offboarding/resignation-requests/employee/:employeeId`

---

### ✅ OFF-006: Offboarding Checklist (HR Manager)
**Requirement**: As an HR Manager, I want an offboarding checklist for asset recovery (IT assets, ID cards, equipment).

**Business Rules**:
- BR 13(a): Clearance checklist required

**Implementation**:
- `createClearanceChecklist(dto: CreateClearanceChecklistDto)`
- Initializes default departments: IT, Finance, Facilities, HR, Admin
- All items start with status `PENDING`
- Tracks equipment list and access card return

**API Endpoint**: `POST /offboarding/clearance-checklists`

---

### ✅ OFF-010: Multi-Department Clearance Sign-offs (HR Manager)
**Requirement**: As HR Manager, I want multi-department exit clearance sign-offs (IT, Finance, Facilities, Line Manager) with statuses.

**Business Rules**:
- BR 13(b, c): Clearance checklist required across departments (IT, HR, Admin, Finance)
- BR 14: Final approvals/signature form filed to HR

**Implementation**:
- `updateClearanceItem(checklistId: string, dto: UpdateClearanceItemDto)`
- Tracks who updated and when
- Automatically checks if all departments approved
- TODO: Notify HR when clearance complete

**API Endpoints**:
- `PATCH /offboarding/clearance-checklists/:id/items`
- `PATCH /offboarding/clearance-checklists/:id/equipment/:equipmentName`
- `POST /offboarding/clearance-checklists/:id/equipment`
- `PATCH /offboarding/clearance-checklists/:id/card-return`
- `GET /offboarding/clearance-checklists/:id/status`

---

### ✅ OFF-007: System Access Revocation (System Admin)
**Requirement**: As a System Admin, I want to revoke system and account access upon termination.

**Business Rules**:
- BR 3(c), 19: Access revocation required for security
- Connects to ONB-013 (scheduled revocation)

**Implementation**:
- `revokeSystemAccess(dto: RevokeAccessDto)`
- Validates approved termination exists
- TODO: Integration with IT/Access Systems
- TODO: Disable SSO/email/tools access
- TODO: Revoke payroll system access
- TODO: Disable time management clock access
- TODO: Set employee profile status to INACTIVE
- TODO: Store access revocation log in audit trail

**API Endpoint**: `POST /offboarding/revoke-access`

---

### ✅ OFF-013: Final Settlement Trigger (HR Manager)
**Requirement**: As HR Manager, I want to trigger benefits termination and final pay calculation (unused leave, deductions).

**Business Rules**:
- BR 9, 11: Unused annuals encashed, benefits auto-terminated at end of notice period

**Implementation**:
- `triggerFinalSettlement(dto: TriggerFinalSettlementDto)`
- Validates termination is approved
- Validates clearance checklist is fully complete
- TODO: Integration with Leaves Module (fetch balance)
- TODO: Integration with Employee Profile (fetch benefits)
- TODO: Integration with Payroll Module (trigger final pay calculation)
- TODO: Trigger service that fills collection relating user to benefit in payroll execution module
- TODO: Schedule benefits auto-termination

**API Endpoint**: `POST /offboarding/trigger-final-settlement`

---

## Data Models Used

### TerminationRequest Schema
- `employeeId`: Reference to EmployeeProfile
- `initiator`: EMPLOYEE, HR, or MANAGER
- `reason`: Mandatory reason for separation
- `employeeComments`: Optional employee input
- `hrComments`: Optional HR notes
- `status`: PENDING, UNDER_REVIEW, APPROVED, REJECTED
- `terminationDate`: Effective date
- `contractId`: Reference to Contract

### ClearanceChecklist Schema
- `terminationId`: Reference to TerminationRequest
- `items`: Array of department clearances
  - `department`: Department name
  - `status`: PENDING, APPROVED, REJECTED
  - `comments`: Department notes
  - `updatedBy`: User who updated
  - `updatedAt`: Timestamp
- `equipmentList`: Array of equipment items
  - `equipmentId`: Optional equipment reference
  - `name`: Equipment name
  - `returned`: Boolean
  - `condition`: Equipment condition notes
- `cardReturned`: Boolean for access card

---

## Workflow Process

### Termination Flow
1. HR Manager creates termination request (OFF-001)
2. Termination request goes through approval workflow
3. Status updated to APPROVED
4. Clearance checklist created (OFF-006)
5. Departments sign off on clearances (OFF-010)
6. System Admin revokes access (OFF-007)
7. HR triggers final settlement (OFF-013)

### Resignation Flow
1. Employee submits resignation request (OFF-018)
2. Employee tracks status (OFF-019)
3. Request goes through approval workflow (Line Manager > Financial > HR)
4. Status updated to APPROVED
5. Clearance checklist created (OFF-006)
6. Departments sign off on clearances (OFF-010)
7. System Admin revokes access (OFF-007)
8. HR triggers final settlement (OFF-013)

---

## Integration Points (TODOs)

### Performance Management Module
- Fetch warnings and low scores for termination justification

### Employee Profile Module
- Validate employee exists
- Fetch benefits information
- Set employee status to INACTIVE

### Leaves Module
- Fetch leave balance
- Calculate unused annual leave encashment

### Payroll Module
- Trigger final pay calculation
- Fill collection relating user to benefit (payroll execution module)
- Process signing bonus clawbacks if applicable
- Schedule benefits auto-termination

### IT/Access Systems
- Disable SSO access
- Disable email access
- Revoke internal systems access
- Disable time management clock access

### Notifications Module
- Trigger workflow approval notifications
- Notify departments for clearance sign-offs
- Notify HR when clearance complete
- Notify IT/System Admin for access revocation
- Notify Payroll department for final settlement
- Notify employee about final settlement timeline

---

## API Endpoints Summary

### Termination Requests
- `POST /offboarding/termination-requests` - Create termination request
- `GET /offboarding/termination-requests` - Get all termination requests (with filters)
- `GET /offboarding/termination-requests/:id` - Get termination request by ID
- `PATCH /offboarding/termination-requests/:id/status` - Update status
- `DELETE /offboarding/termination-requests/:id` - Delete termination request

### Resignation Requests
- `POST /offboarding/resignation-requests` - Create resignation request
- `GET /offboarding/resignation-requests/employee/:employeeId` - Track resignation status

### Clearance Checklists
- `POST /offboarding/clearance-checklists` - Create clearance checklist
- `GET /offboarding/clearance-checklists` - Get all clearance checklists
- `GET /offboarding/clearance-checklists/:id` - Get clearance checklist by ID
- `GET /offboarding/clearance-checklists/termination/:terminationId` - Get by termination ID
- `GET /offboarding/clearance-checklists/:id/status` - Get completion status
- `PATCH /offboarding/clearance-checklists/:id/items` - Update department clearance
- `PATCH /offboarding/clearance-checklists/:id/equipment/:equipmentName` - Update equipment status
- `POST /offboarding/clearance-checklists/:id/equipment` - Add equipment
- `PATCH /offboarding/clearance-checklists/:id/card-return` - Update card return status

### Access Revocation & Final Settlement
- `POST /offboarding/revoke-access` - Revoke system access
- `POST /offboarding/trigger-final-settlement` - Trigger final settlement

---

## Error Handling

### Common Errors
- `404 Not Found`: Contract, termination request, or checklist not found
- `409 Conflict`: Active termination/resignation request already exists
- `400 Bad Request`: Invalid status transition, incomplete clearance, or unapproved termination

### Validation
- All MongoDB ObjectIds validated
- Enum values validated
- Required fields enforced
- Business rule validations implemented

---

## Testing

See `documentation/HTTP testing/offboarding.http` for complete HTTP test suite covering all endpoints and requirements.

