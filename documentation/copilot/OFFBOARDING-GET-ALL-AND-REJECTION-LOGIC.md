# Offboarding - Get All Requests Documentation

## ✅ ALL ROUTES IMPLEMENTED

### 1. Get All Termination Requests (with filters)
**Endpoint**: `GET /offboarding/termination-requests`

**Query Parameters**:
- `employeeId` (optional) - Filter by specific employee
- `status` (optional) - Filter by status: `pending`, `under_review`, `approved`, `rejected`
- `initiator` (optional) - Filter by who initiated: `employee`, `hr`, `manager`

**Example Requests**:
```http
# Get ALL termination/resignation requests
GET http://localhost:3000/offboarding/termination-requests

# Get only resignations (employee-initiated)
GET http://localhost:3000/offboarding/termination-requests?initiator=employee

# Get only HR-initiated terminations
GET http://localhost:3000/offboarding/termination-requests?initiator=hr

# Get only PENDING requests
GET http://localhost:3000/offboarding/termination-requests?status=pending

# Get APPROVED resignations
GET http://localhost:3000/offboarding/termination-requests?initiator=employee&status=approved

# Get specific employee's requests
GET http://localhost:3000/offboarding/termination-requests?employeeId=507f1f77bcf86cd799439011
```

---

### 2. Get All Resignation Requests
**Endpoint**: `GET /offboarding/resignation-requests/all`

**Query Parameters**:
- `status` (optional) - Filter by status

**Description**: Convenience endpoint that returns ONLY employee-initiated requests (resignations)

**Example Requests**:
```http
# Get ALL resignations
GET http://localhost:3000/offboarding/resignation-requests/all

# Get pending resignations
GET http://localhost:3000/offboarding/resignation-requests/all?status=pending

# Get approved resignations
GET http://localhost:3000/offboarding/resignation-requests/all?status=approved
```

---

### 3. Get Requests by Initiator
**Endpoint**: `GET /offboarding/termination-requests/by-initiator/:initiator`

**Path Parameters**:
- `initiator` - `employee`, `hr`, or `manager`

**Query Parameters**:
- `status` (optional) - Filter by status

**Example Requests**:
```http
# Get all employee-initiated (resignations)
GET http://localhost:3000/offboarding/termination-requests/by-initiator/employee

# Get all HR-initiated terminations
GET http://localhost:3000/offboarding/termination-requests/by-initiator/hr

# Get all manager-initiated terminations
GET http://localhost:3000/offboarding/termination-requests/by-initiator/manager

# Get pending HR terminations
GET http://localhost:3000/offboarding/termination-requests/by-initiator/hr?status=pending
```

---

### 4. Get Requests by Status
**Endpoint**: `GET /offboarding/termination-requests/by-status/:status`

**Path Parameters**:
- `status` - `pending`, `under_review`, `approved`, or `rejected`

**Description**: Returns ALL requests (terminations + resignations) with the specified status

**Example Requests**:
```http
# Get all pending requests (any initiator)
GET http://localhost:3000/offboarding/termination-requests/by-status/pending

# Get all approved requests (any initiator)
GET http://localhost:3000/offboarding/termination-requests/by-status/approved

# Get all rejected requests (any initiator)
GET http://localhost:3000/offboarding/termination-requests/by-status/rejected

# Get all under review requests (any initiator)
GET http://localhost:3000/offboarding/termination-requests/by-status/under_review
```

---

### 5. Track Employee's Own Resignations
**Endpoint**: `GET /offboarding/resignation-requests/employee/:employeeId`

**Path Parameters**:
- `employeeId` - Employee ID

**Description**: Returns only the resignation requests for a specific employee (for employee self-service)

**Example Requests**:
```http
# Employee tracking their own resignation
GET http://localhost:3000/offboarding/resignation-requests/employee/507f1f77bcf86cd799439011
```

---

## Complete Route Summary

| Route | Purpose | Filters |
|-------|---------|---------|
| `GET /offboarding/termination-requests` | Get ALL (most flexible) | employeeId, status, initiator |
| `GET /offboarding/resignation-requests/all` | Get ALL resignations | status |
| `GET /offboarding/termination-requests/by-initiator/:initiator` | Get by who initiated | initiator (path), status |
| `GET /offboarding/termination-requests/by-status/:status` | Get by status only | status (path) |
| `GET /offboarding/resignation-requests/employee/:employeeId` | Employee self-service | employeeId (path) |

---

## Termination vs Resignation

### Termination (HR/Manager Initiated)
- `initiator: 'hr'` or `initiator: 'manager'`
- Initiated by management/HR
- Usually due to performance, misconduct, redundancy, etc.

### Resignation (Employee Initiated)
- `initiator: 'employee'`
- Initiated by employee
- Voluntary departure

Both use the same `TerminationRequest` schema but filtered by `initiator` field.

---

## Status Flow

```
PENDING → UNDER_REVIEW → APPROVED ✓
                      ↘ REJECTED ✗
```

### Status Definitions:

1. **PENDING** - Initial state, awaiting review
2. **UNDER_REVIEW** - Being reviewed by approvers
3. **APPROVED** - Approved, proceed with offboarding
4. **REJECTED** - Rejected, termination/resignation denied

---

## 🔍 TERMINATION REJECTION - LOGICAL SCENARIOS

### When Can a Termination Be REJECTED?

#### 1. **Resignation Rejections** (Employee-Initiated)
Most common scenarios:

##### a) **Notice Period Issues**
- Employee provides insufficient notice (e.g., 2 weeks when 30 days required)
- Employee wants immediate departure but contract requires notice
- **HR Response**: "REJECTED - Must provide 30 days notice per contract clause 8.2"

##### b) **Critical Project Dependency**
- Employee is leading critical project
- No knowledge transfer possible in short timeframe
- **HR Response**: "REJECTED - Must complete Project X (ends March 2026) or arrange replacement"

##### c) **Active Training Investment**
- Company paid for expensive training/certification
- Contract has clawback clause requiring X months service
- Employee tries to leave before completing obligation
- **HR Response**: "REJECTED - Must complete 12 months post-training per training agreement or repay $15,000"

##### d) **Pending Investigation**
- Employee under investigation for misconduct
- Resignation submitted to avoid disciplinary action
- **HR Response**: "REJECTED - Cannot resign during pending investigation. Investigation must complete first"

##### e) **Counter-Offer Accepted**
- Employee submits resignation
- Company makes counter-offer
- Employee accepts counter-offer
- **HR Response**: "REJECTED - Counter-offer accepted, resignation withdrawn"

##### f) **Legal/Contractual Issues**
- Non-compete clause disputes
- Intellectual property concerns
- Financial discrepancies being investigated
- **HR Response**: "REJECTED - Must resolve IP ownership issues before departure"

---

#### 2. **Termination Rejections** (HR/Manager-Initiated)
Less common but possible:

##### a) **Insufficient Evidence**
- Manager wants to terminate for performance
- Performance reviews don't support claim
- No documented warnings
- **Senior HR Response**: "REJECTED - Insufficient documentation, must follow progressive discipline policy"

##### b) **Discriminatory Concerns**
- Protected characteristic identified (age, race, disability, etc.)
- Legal review flags potential discrimination lawsuit
- **Legal/HR Response**: "REJECTED - Potential discrimination claim, requires further review"

##### c) **Process Not Followed**
- Manager skips required PIP (Performance Improvement Plan)
- No union consultation (if unionized)
- Required approvals missing
- **HR Response**: "REJECTED - Must complete 60-day PIP per policy HR-203"

##### d) **Bad Timing**
- Employee on protected leave (medical, maternity, etc.)
- Pending legal proceedings
- **Legal Response**: "REJECTED - Cannot terminate employee on FMLA leave"

##### e) **Budget/Restructure Issues**
- Redundancy proposed but no budget approval
- Restructure plan not finalized
- **Finance/HR Response**: "REJECTED - Redundancy budget not approved for FY2026"

##### f) **Alternative Resolution**
- Mediation available
- Transfer to different department possible
- **HR Response**: "REJECTED - Employee agreed to transfer to Operations, termination withdrawn"

---

### Rejection Workflow Example

```
Manager: "I want to terminate John for poor performance"
    ↓
HR Review: 
    - Check documentation ✗ (only 1 warning in 2 years)
    - Check PIP completion ✗ (no PIP done)
    - Check legal risks ⚠ (John is 62, age discrimination risk)
    ↓
HR Director: "REJECTED - Insufficient progressive discipline"
    ↓
Action: Manager must:
    1. Document performance issues (30 days)
    2. Issue formal warnings (60 days)
    3. Complete PIP (90 days)
    4. Re-submit termination request if no improvement
```

---

### Schema Support for Rejection

The `TerminationRequest` schema supports rejection:

```typescript
status: 'rejected'  // Status enum value
hrComments: 'string'  // Why it was rejected
```

**Example**:
```json
{
  "status": "rejected",
  "hrComments": "Insufficient notice period. Contract requires 30 days, employee provided 14 days. Must work through April 30, 2026 or arrange replacement acceptable to management."
}
```

---

### Business Impact of Rejection

#### For Resignations:
- Employee must continue working (or face breach of contract)
- Employee may escalate to legal review
- Employee may agree to modified terms (e.g., longer notice)
- Employee may withdraw resignation entirely

#### For Terminations:
- Employee keeps job (temporarily or permanently)
- Manager must follow proper procedures
- Alternative solutions explored (PIP, transfer, mediation)
- Protects company from wrongful termination lawsuits

---

## API Examples

### Reject a Resignation
```http
PATCH http://localhost:3000/offboarding/termination-requests/507f1f77bcf86cd799439013/status
Content-Type: application/json

{
  "status": "rejected",
  "hrComments": "Insufficient notice period provided. Per employment contract section 8.2, 30 days notice required. Employee provided only 14 days. Must extend resignation date to April 30, 2026 or arrange suitable replacement."
}
```

### Reject an HR Termination
```http
PATCH http://localhost:3000/offboarding/termination-requests/507f1f77bcf86cd799439014/status
Content-Type: application/json

{
  "status": "rejected",
  "hrComments": "REJECTED by HR Director - Insufficient progressive discipline documentation. Manager must complete 90-day PIP per policy HR-203 before termination can be reconsidered. No documented warnings in past 12 months."
}
```

---

## Best Practices

### When to Use REJECTED Status:

✅ **DO Reject When**:
- Legal/compliance issues identified
- Required procedures not followed
- Insufficient documentation
- Protected employee status
- Better alternative exists

❌ **DON'T Reject When**:
- Just disagreeing with decision (use proper approval flow)
- Already approved (cannot reverse)
- Employee has valid grounds
- Process was properly followed

### After Rejection:

1. **Update Status**: Set to `rejected`
2. **Document Reasoning**: Clear `hrComments` explaining why
3. **Provide Next Steps**: What needs to happen for approval
4. **Communication**: Inform all parties of decision
5. **Follow-up**: Set timeline for resolution

---

## Summary

✅ **All Routes Implemented**:
- Get all termination/resignation requests (with flexible filters)
- Get by initiator (employee/hr/manager)
- Get by status (pending/under_review/approved/rejected)
- Employee self-service tracking

✅ **Rejection is Logical**:
- Resignations can be rejected for notice period, contractual obligations, or critical business needs
- Terminations can be rejected for insufficient documentation, legal risks, or process violations
- Status enum supports `rejected` value
- `hrComments` field documents rejection reasoning

✅ **Use Cases Clear**:
- Protects company from legal issues
- Ensures proper procedures followed
- Allows negotiation and alternative solutions
- Maintains audit trail

