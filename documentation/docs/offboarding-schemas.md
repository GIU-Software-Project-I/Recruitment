# Offboarding Schemas Documentation

## Overview
This document details the database schemas used in the offboarding module. All schemas are implemented using Mongoose and MongoDB.

---

## TerminationRequest Schema

**Collection**: `terminationrequests`

**Description**: Stores all termination and resignation requests for employees.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Yes | Auto-generated MongoDB ID |
| `employeeId` | ObjectId | Yes | Reference to EmployeeProfile |
| `initiator` | Enum | Yes | Who initiated: `employee`, `hr`, `manager` |
| `reason` | String | Yes | Reason for termination/resignation |
| `employeeComments` | String | No | Employee's additional comments |
| `hrComments` | String | No | HR's notes and comments |
| `status` | Enum | Yes | Current status (default: `pending`) |
| `terminationDate` | Date | No | Effective date of termination |
| `contractId` | ObjectId | Yes | Reference to Contract |
| `createdAt` | Date | Yes | Auto-generated timestamp |
| `updatedAt` | Date | Yes | Auto-generated timestamp |

### Enums

**TerminationInitiation**:
- `employee`: Employee-initiated resignation
- `hr`: HR-initiated termination
- `manager`: Manager-initiated termination

**TerminationStatus**:
- `pending`: Initial status, awaiting review
- `under_review`: Currently being reviewed
- `approved`: Termination approved
- `rejected`: Termination rejected

### Indexes
- `employeeId`: For quick employee lookup
- `status`: For filtering by status
- `createdAt`: For sorting by date

### Business Rules
- BR 4: Employee separation needs effective date and reason
- BR 6: Employee separation can be triggered by resignation
- Only one active (pending/under_review) request per employee

### Example Document
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "employeeId": "507f1f77bcf86cd799439012",
  "initiator": "employee",
  "reason": "Better opportunity abroad",
  "employeeComments": "Thank you for the past 3 years",
  "hrComments": "Notice period: 30 days",
  "status": "approved",
  "terminationDate": "2026-01-31T00:00:00.000Z",
  "contractId": "507f1f77bcf86cd799439013",
  "createdAt": "2025-12-03T10:00:00.000Z",
  "updatedAt": "2025-12-10T14:30:00.000Z"
}
```

---

## ClearanceChecklist Schema

**Collection**: `clearancechecklists`

**Description**: Tracks the offboarding clearance process across departments and asset returns.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Yes | Auto-generated MongoDB ID |
| `terminationId` | ObjectId | Yes | Reference to TerminationRequest |
| `items` | Array | No | Department clearance items |
| `equipmentList` | Array | No | Equipment return tracking |
| `cardReturned` | Boolean | No | Access card return status (default: false) |
| `createdAt` | Date | Yes | Auto-generated timestamp |
| `updatedAt` | Date | Yes | Auto-generated timestamp |

### Nested Schema: Items (Department Clearances)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `department` | String | Yes | Department name (IT, Finance, Facilities, HR, Admin) |
| `status` | Enum | Yes | Clearance status (default: `pending`) |
| `comments` | String | No | Department-specific comments |
| `updatedBy` | ObjectId | No | Reference to User who updated |
| `updatedAt` | Date | Yes | When clearance was updated |

### Nested Schema: EquipmentList

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `equipmentId` | ObjectId | No | Reference to Equipment (if tracked) |
| `name` | String | Yes | Equipment name/description |
| `returned` | Boolean | Yes | Whether equipment was returned |
| `condition` | String | No | Condition notes |

### Enums

**ApprovalStatus** (for items.status):
- `pending`: Awaiting clearance
- `approved`: Department cleared
- `rejected`: Issues found, not cleared

### Default Departments
When creating a clearance checklist without specifying items, the system initializes these default departments:
- IT
- Finance
- Facilities
- HR
- Admin

### Business Rules
- BR 13(a): Clearance checklist required
- BR 13(b, c): Clearance required across departments (IT, HR, Admin, Finance)
- BR 14: Final approvals/signature form filed to HR
- One clearance checklist per termination request
- All departments must approve before final settlement
- All equipment must be marked as returned
- Access card must be returned

### Example Document
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "terminationId": "507f1f77bcf86cd799439011",
  "items": [
    {
      "department": "IT",
      "status": "approved",
      "comments": "Laptop and accessories returned in good condition",
      "updatedBy": "507f1f77bcf86cd799439015",
      "updatedAt": "2025-12-15T09:00:00.000Z"
    },
    {
      "department": "Finance",
      "status": "approved",
      "comments": "All expense reports settled, no outstanding payments",
      "updatedBy": "507f1f77bcf86cd799439016",
      "updatedAt": "2025-12-16T11:00:00.000Z"
    },
    {
      "department": "Facilities",
      "status": "pending",
      "comments": "Awaiting office key return",
      "updatedAt": "2025-12-03T10:00:00.000Z"
    },
    {
      "department": "HR",
      "status": "approved",
      "comments": "Exit interview completed",
      "updatedBy": "507f1f77bcf86cd799439017",
      "updatedAt": "2025-12-17T14:00:00.000Z"
    },
    {
      "department": "Admin",
      "status": "approved",
      "comments": "Parking pass returned",
      "updatedBy": "507f1f77bcf86cd799439018",
      "updatedAt": "2025-12-18T10:30:00.000Z"
    }
  ],
  "equipmentList": [
    {
      "equipmentId": "507f1f77bcf86cd799439019",
      "name": "Laptop Dell XPS 15",
      "returned": true,
      "condition": "Good condition, minor wear on keyboard"
    },
    {
      "equipmentId": "507f1f77bcf86cd799439020",
      "name": "Monitor Samsung 27 inch",
      "returned": true,
      "condition": "Excellent condition"
    },
    {
      "name": "Desk Phone",
      "returned": true,
      "condition": "Working"
    },
    {
      "name": "USB Headset",
      "returned": true,
      "condition": "Excellent"
    }
  ],
  "cardReturned": true,
  "createdAt": "2025-12-03T10:00:00.000Z",
  "updatedAt": "2025-12-18T10:30:00.000Z"
}
```

### Clearance Completion Logic

A clearance is considered **fully complete** when:
1. All department items have status = `approved`
2. All equipment items have `returned` = `true`
3. `cardReturned` = `true`

This is checked via the `getClearanceCompletionStatus` service method.

---

## Related Schemas (Referenced)

### Contract Schema
**Collection**: `contracts`

Referenced by: `TerminationRequest.contractId`

Contains:
- `offerId`: Reference to Offer
- `acceptanceDate`: Date
- `grossSalary`: Number
- `signingBonus`: Number (optional)
- `role`: String
- `benefits`: Array of strings
- `documentId`: Reference to Document
- Signature fields

### Document Schema
**Collection**: `documents`

Referenced by: `Contract.documentId`

Contains:
- `ownerId`: Reference to User
- `type`: Enum (cv, contract, id, certificate, resignation)
- `filePath`: String
- `uploadedAt`: Date

### EmployeeProfile Schema
**Collection**: `employeeprofiles`

Referenced by: `TerminationRequest.employeeId`

External schema managed by Employee module.

---

## Data Relationships

```
TerminationRequest
├── employeeId → EmployeeProfile
└── contractId → Contract
    └── offerId → Offer
        └── applicationId → Application

ClearanceChecklist
└── terminationId → TerminationRequest
    ├── items[].updatedBy → User
    └── equipmentList[].equipmentId → Equipment (optional)
```

---

## Integration Points

### Employee Profile Module
- Validates employee exists
- Provides employee information
- Updates employee status to INACTIVE after termination

### Payroll Module
- Uses contract information for final pay calculation
- Processes signing bonus clawbacks
- Handles benefits termination

### Leaves Module
- Provides leave balance for encashment calculation

### IT/Access Systems
- Receives access revocation triggers
- Manages system access disabling

---

## Migration Notes

### Initial Setup
```javascript
// Create indexes
db.terminationrequests.createIndex({ employeeId: 1 });
db.terminationrequests.createIndex({ status: 1 });
db.terminationrequests.createIndex({ createdAt: -1 });

db.clearancechecklists.createIndex({ terminationId: 1 }, { unique: true });
```

### Data Consistency
- Termination requests should not be deleted if approved
- Clearance checklists are cascade-deleted when termination request is deleted (if not approved)
- Historical records should be archived, not deleted

---

## Validation Rules

### TerminationRequest
- `reason`: Minimum 10 characters
- `terminationDate`: Must be future date or within past 30 days
- `employeeId`: Must be valid MongoDB ObjectId
- `contractId`: Must exist in contracts collection

### ClearanceChecklist
- `terminationId`: Must exist and be approved
- `items.department`: Must match predefined list
- `equipmentList.name`: Required, minimum 3 characters
- Only one clearance checklist per termination request

---

## Query Examples

### Find pending terminations
```javascript
db.terminationrequests.find({
  status: 'pending'
}).sort({ createdAt: -1 });
```

### Find employee's resignation history
```javascript
db.terminationrequests.find({
  employeeId: ObjectId("507f1f77bcf86cd799439011"),
  initiator: 'employee'
}).sort({ createdAt: -1 });
```

### Find incomplete clearances
```javascript
db.clearancechecklists.find({
  'items.status': 'pending'
});
```

### Find approved terminations needing clearance
```javascript
db.terminationrequests.aggregate([
  { $match: { status: 'approved' } },
  { $lookup: {
      from: 'clearancechecklists',
      localField: '_id',
      foreignField: 'terminationId',
      as: 'clearance'
    }
  },
  { $match: { clearance: { $size: 0 } } }
]);
```

---

## Performance Considerations

- Index on `employeeId` for fast employee lookups
- Index on `status` for filtering dashboard views
- Index on `terminationId` in clearance checklists (unique)
- Consider archiving old termination records (>2 years)
- Populate queries used strategically to avoid N+1 problems

---

## Security & Privacy

- Sensitive employee termination data
- Access restricted by role-based authentication
- Audit trail maintained via timestamps and `updatedBy`
- GDPR compliance: Personal data can be anonymized after retention period
- Encryption at rest recommended for production databases

