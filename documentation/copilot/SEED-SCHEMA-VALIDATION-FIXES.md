# ✅ SEED SCRIPT - SCHEMA VALIDATION FIXES

## Date: December 3, 2025

---

## Issues Fixed

### 1. ✅ Import Path Error
**File**: `EmployeeTerminationResignation.schema.ts`

**Error**: 
```
Cannot find module '../../../recruitment/models/termination-request.schema'
```

**Fix**: Changed import path from:
```typescript
from '../../../recruitment/models/termination-request.schema'
```
To:
```typescript
from '../../../../models/termination-request.schema'
```

**Reason**: TerminationRequest is in `src/models/` not `src/modules/recruitment/models/`

---

### 2. ✅ Department Schema Mismatch
**Error**:
```
Department validation failed: name: Path `name` is required., code: Path `code` is required.
```

**Schema Expects**:
- `code` (string, required, unique)
- `name` (string, required)
- `description` (string, optional)
- `headPositionId` (ObjectId, optional)
- `isActive` (boolean, default: true)

**Seed Data Had**:
- `departmentCode` ❌
- `departmentName` ❌
- `managerEmployeeId` ❌ (doesn't exist in schema)
- `parentDepartmentId` ❌ (doesn't exist in schema)

**Fixed To**:
```typescript
{
    code: 'IT',
    name: 'Information Technology',
    description: 'Manages all IT infrastructure...',
    isActive: true,
}
```

---

### 3. ✅ Position Schema Mismatch
**Schema Expects**:
- `code` (string, required, unique)
- `title` (string, required)
- `description` (string, optional)
- `departmentId` (ObjectId, required, ref: Department)
- `reportsToPositionId` (ObjectId, optional)
- `isActive` (boolean, default: true)

**Seed Data Had**:
- `positionCode` ❌
- `positionTitle` ❌
- `responsibilities` ❌ (doesn't exist in schema)
- `requiredQualifications` ❌ (doesn't exist in schema)
- `salaryRange` ❌ (doesn't exist in schema)

**Fixed To**:
```typescript
{
    code: 'SWE-001',
    title: 'Senior Software Engineer',
    departmentId: departments[0]._id,
    description: 'Develops and maintains software applications',
    isActive: true,
}
```

---

### 4. ✅ JobTemplate Schema Mismatch
**Schema Expects**:
- `title` (string, required)
- `department` (string, required) - NOT ObjectId, just string!
- `qualifications` (array of strings)
- `skills` (array of strings)
- `description` (string, optional)

**Seed Data Had**:
- `departmentId` ❌ (should be department string)
- `positionId` ❌ (doesn't exist in schema)
- `responsibilities` ❌ (doesn't exist in schema)
- `benefits` ❌ (doesn't exist in schema)
- `salaryRange` ❌ (doesn't exist in schema)

**Fixed To**:
```typescript
{
    title: 'Software Engineer Template',
    department: 'Information Technology', // String, not ObjectId!
    description: 'Standard template for software engineering roles',
    qualifications: ['BSc in Computer Science', '5+ years experience'],
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
}
```

---

### 5. ✅ JobRequisition Schema Mismatch
**Schema Expects**:
- `requisitionId` (string, required)
- `templateId` (ObjectId, ref: JobTemplate)
- `openings` (number, required)
- `location` (string)
- `hiringManagerId` (ObjectId, required, ref: User)
- `publishStatus` (enum: 'draft', 'published', 'closed', default: 'draft')
- `postingDate` (Date, optional)
- `expiryDate` (Date, optional)

**Seed Data Had**:
- `requisitionNumber` ❌ (should be requisitionId)
- `numberOfPositions` ❌ (should be openings)
- `requestedBy` ❌ (should be hiringManagerId)
- `departmentId` ❌ (doesn't exist in schema)
- `positionId` ❌ (doesn't exist in schema)
- `urgency` ❌ (doesn't exist in schema)
- `justification` ❌ (doesn't exist in schema)
- `status` ❌ (should be publishStatus)
- `submittedDate` ❌ (should be postingDate)
- `approvedBy` ❌ (doesn't exist in schema)
- `approvedDate` ❌ (doesn't exist in schema)

**Fixed To**:
```typescript
{
    requisitionId: 'REQ-2025-001',
    templateId: jobTemplates[0]._id,
    hiringManagerId: candidates[0]._id,
    openings: 3,
    location: 'New York, NY',
    publishStatus: 'published',
    postingDate: new Date('2025-11-01'),
    expiryDate: new Date('2026-01-01'),
}
```

---

## Summary of Fixes

| Schema | Fields Fixed | Status |
|--------|-------------|--------|
| EmployeeTerminationResignation | Import path | ✅ Fixed |
| Department | code, name (removed managerEmployeeId, parentDepartmentId) | ✅ Fixed |
| Position | code, title (removed responsibilities, requiredQualifications, salaryRange) | ✅ Fixed |
| JobTemplate | department string (removed departmentId, positionId, responsibilities, benefits, salaryRange) | ✅ Fixed |
| JobRequisition | requisitionId, openings, hiringManagerId, publishStatus (removed many fields) | ✅ Fixed |

---

## Key Lessons

### 1. Always Check Schema Definitions
Before seeding, verify the actual schema fields match your seed data.

### 2. Field Name Conventions
- Some schemas use short names: `code`, `name`, `title`
- Don't assume field names based on other schemas

### 3. Reference Types
- Some fields are ObjectIds (e.g., `departmentId` in Position)
- Some fields are strings (e.g., `department` in JobTemplate) 
- Always check the type!

### 4. Required vs Optional
- Required fields must be in seed data
- Optional fields can be omitted
- Don't add fields that don't exist in schema

### 5. Import Paths
- Use correct relative paths
- `src/models/` is different from `src/modules/*/models/`

---

## Remaining Schemas to Validate

The following schemas may need similar validation:
- [ ] Application
- [ ] Interview
- [ ] Offer
- [ ] Contract
- [ ] Onboarding
- [ ] TerminationRequest
- [ ] ClearanceChecklist
- [ ] All Time Management schemas
- [ ] All Payroll schemas
- [ ] Leave schemas

**Next Step**: Run seed script and fix errors as they appear

---

## Testing Status

✅ Import path fixed
✅ Department schema fixed
✅ Position schema fixed  
✅ JobTemplate schema fixed
✅ JobRequisition schema fixed
⏳ Running seed script to validate remaining schemas...

---

**Status**: Fixes Applied - Testing in Progress

