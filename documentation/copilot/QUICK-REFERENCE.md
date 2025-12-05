# Quick Reference Guide - Onboarding & Offboarding API

## Base URL
```
http://localhost:3000/onboarding
http://localhost:3000/offboarding
```

---

## Onboarding Endpoints Quick Reference

### Document Upload (Candidate)
```http
POST /onboarding/upload-contract
{
  "ownerId": "user_id",
  "type": "contract",
  "filePath": "/path/to/contract.pdf"
}
```

### Task Checklists (ONB-001)
```http
POST /onboarding
{
  "employeeId": "emp_id",
  "contractId": "contract_id",
  "tasks": [...] // Optional
}

GET /onboarding
GET /onboarding/:id
POST /onboarding/:id/tasks
```

### Contract Details (ONB-002)
```http
GET /onboarding/contracts/:contractId
```

### Tracker & Progress (ONB-004)
```http
GET /onboarding/employee/:employeeId
GET /onboarding/:id/progress
PATCH /onboarding/:id/tasks/:taskName/status
```

### Pending Tasks (ONB-005)
```http
GET /onboarding/employee/:employeeId/pending-tasks
```

### Documents (ONB-007)
```http
POST /onboarding/documents
GET /onboarding/documents/owner/:ownerId
PATCH /onboarding/:id/tasks/:taskName/document
```

### System Access (ONB-009)
```http
POST /onboarding/provision-access
{
  "employeeId": "emp_id",
  "startDate": "2026-01-01T00:00:00.000Z",
  "notes": "..."
}
```

### Equipment (ONB-012)
```http
POST /onboarding/reserve-equipment
{
  "employeeId": "emp_id",
  "equipment": ["Laptop", "Monitor"],
  "deskNumber": "D-301",
  "accessCardNumber": "AC-12345"
}
```

### Access Revocation (ONB-013)
```http
POST /onboarding/schedule-access-revocation
{
  "employeeId": "emp_id",
  "revocationDate": "2026-12-31T23:59:59.000Z"
}
```

### Payroll (ONB-018)
```http
POST /onboarding/trigger-payroll-initiation
{
  "contractId": "contract_id",
  "notes": "..."
}
```

### Signing Bonus (ONB-019)
```http
POST /onboarding/contracts/:contractId/process-signing-bonus
```

### Cancel Onboarding (ONB-020)
```http
DELETE /onboarding/:id/cancel
{
  "reason": "No-show on first day"
}
```

---

## Offboarding Endpoints Quick Reference

### Termination Requests (OFF-001)
```http
POST /offboarding/termination-requests
{
  "employeeId": "emp_id",
  "initiator": "hr|manager|employee",
  "reason": "Performance issues",
  "hrComments": "...",
  "terminationDate": "2026-12-31T00:00:00.000Z",
  "contractId": "contract_id"
}

GET /offboarding/termination-requests
GET /offboarding/termination-requests/:id
GET /offboarding/termination-requests?status=pending
GET /offboarding/termination-requests?initiator=employee
PATCH /offboarding/termination-requests/:id/status
DELETE /offboarding/termination-requests/:id
```

### Resignation Requests (OFF-018, OFF-019)
```http
POST /offboarding/resignation-requests
{
  "employeeId": "emp_id",
  "reason": "Better opportunity",
  "employeeComments": "...",
  "terminationDate": "2026-01-31T00:00:00.000Z",
  "contractId": "contract_id"
}

GET /offboarding/resignation-requests/employee/:employeeId
```

### Clearance Checklist (OFF-006)
```http
POST /offboarding/clearance-checklists
{
  "terminationId": "term_id",
  "items": [...],
  "equipmentList": [...],
  "cardReturned": false
}

GET /offboarding/clearance-checklists
GET /offboarding/clearance-checklists/:id
GET /offboarding/clearance-checklists/termination/:terminationId
```

### Clearance Items (OFF-010)
```http
PATCH /offboarding/clearance-checklists/:id/items
{
  "department": "IT",
  "status": "approved",
  "comments": "Laptop returned",
  "updatedBy": "user_id"
}

GET /offboarding/clearance-checklists/:id/status
```

### Equipment
```http
PATCH /offboarding/clearance-checklists/:id/equipment/:name
{
  "name": "Laptop Dell XPS 15",
  "returned": true,
  "condition": "Good condition"
}

POST /offboarding/clearance-checklists/:id/equipment
{
  "name": "USB Headset",
  "returned": true,
  "condition": "Excellent"
}
```

### Access Card
```http
PATCH /offboarding/clearance-checklists/:id/card-return
{
  "cardReturned": true
}
```

### Revoke Access (OFF-007)
```http
POST /offboarding/revoke-system-access
{
  "employeeId": "emp_id"
}
```

### Final Settlement (OFF-013)
```http
POST /offboarding/trigger-final-settlement
{
  "terminationId": "term_id"
}
```

---

## Common Query Filters

### By Status
```http
GET /offboarding/termination-requests?status=pending
GET /offboarding/termination-requests?status=approved
GET /offboarding/termination-requests?status=rejected
GET /offboarding/termination-requests?status=under_review
```

### By Initiator
```http
GET /offboarding/termination-requests?initiator=hr
GET /offboarding/termination-requests?initiator=manager
GET /offboarding/termination-requests?initiator=employee
```

### By Employee
```http
GET /offboarding/termination-requests?employeeId=emp_id
GET /onboarding/employee/:employeeId
```

---

## Status Enum Values

### OnboardingTaskStatus
```
pending
in_progress
completed
rejected
```

### TerminationStatus
```
pending
under_review
approved
rejected
```

### ApprovalStatus (Clearance Items)
```
pending
approved
rejected
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success (GET, PATCH, POST with data) |
| 201 | Created (POST) |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 409 | Conflict (duplicate entry) |
| 500 | Server Error |

---

## Error Response Format
```json
{
  "statusCode": 400,
  "message": "Contract not found"
}
```

---

## Common Errors & Solutions

### Error: "Contract not found"
- Check that the contractId is valid
- Verify the contract exists in the database

### Error: "Onboarding checklist already exists for this employee"
- Only one active onboarding per employee
- Complete or cancel existing before creating new

### Error: "Cannot delete an approved termination request"
- Only pending/under_review requests can be deleted
- Must cancel or reject instead

### Error: "Cannot cancel completed onboarding"
- Onboarding marked as completed cannot be cancelled
- Contact HR to handle special cases

### Error: "Clearance checklist is not fully complete"
- Final settlement requires all departments approved
- All equipment returned
- Card returned
- Check pending items in status endpoint

---

## Testing with cURL

### Create Onboarding
```bash
curl -X POST http://localhost:3000/onboarding \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "507f1f77bcf86cd799439011",
    "contractId": "507f1f77bcf86cd799439012"
  }'
```

### Get Onboarding Progress
```bash
curl -X GET http://localhost:3000/onboarding/507f1f77bcf86cd799439013/progress
```

### Create Termination Request
```bash
curl -X POST http://localhost:3000/offboarding/termination-requests \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "507f1f77bcf86cd799439011",
    "initiator": "hr",
    "reason": "Performance issues",
    "terminationDate": "2026-12-31T00:00:00.000Z",
    "contractId": "507f1f77bcf86cd799439012"
  }'
```

### Update Termination Status
```bash
curl -X PATCH http://localhost:3000/offboarding/termination-requests/507f1f77bcf86cd799439013/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "approved",
    "hrComments": "Approved by HR Director"
  }'
```

---

## Integration Points (TODO)

The following external integrations are marked as TODO in the code:

1. **Employee Profile Module** - Employee validation and creation
2. **Payroll Module** - Payroll initiation and signing bonuses
3. **Leaves Module** - Leave balance and encashment calculations
4. **Notifications Module** - Reminders and approval notifications
5. **IT/Access Systems** - Email, SSO, and system access management
6. **Facilities/Admin Systems** - Equipment and desk reservation
7. **Performance Management** - Warnings and performance scores
8. **Scheduler** - Scheduled access revocation

All TODO comments are in the service files with instructions for implementation.

---

## File Locations

| File | Purpose |
|------|---------|
| `src/services/onboarding.service.ts` | Onboarding business logic |
| `src/services/offboarding.service.ts` | Offboarding business logic |
| `src/controllers/onboarding.controller.ts` | Onboarding HTTP routes |
| `src/controllers/offboarding.controller.ts` | Offboarding HTTP routes |
| `src/dto/onboarding/*` | Onboarding data validation |
| `src/dto/offboarding/*` | Offboarding data validation |
| `src/models/*schema.ts` | Database schemas (read-only) |
| `src/enums/*.enum.ts` | Enum definitions (read-only) |
| `documentation/HTTP testing/*.http` | HTTP test cases |
| `documentation/docs/REQUIREMENTS-*.md` | Requirements documentation |

---

## Support & Documentation

- Full requirements checklist: `documentation/docs/REQUIREMENTS-COMPLETION-CHECKLIST.md`
- Implementation summary: `documentation/docs/IMPLEMENTATION-SUMMARY.md`
- HTTP tests: `documentation/HTTP testing/onboarding.http` & `offboarding.http`

For integration support, refer to the TODO comments in service files.


