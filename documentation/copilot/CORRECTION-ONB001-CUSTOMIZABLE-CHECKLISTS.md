# Correction: Onboarding Task Customization (ONB-001)

**Date**: December 5, 2025
**Issue**: Hardcoded default tasks violated "customizable checklists" requirement
**Status**: ✅ FIXED

---

## The Issue

Initial implementation had hardcoded default tasks:
```typescript
const defaultTasks = [
    { name: 'Complete I-9 Form', department: 'HR', notes: 'Required by Day 1' },
    { name: 'Upload ID Documents', department: 'HR', notes: 'Government-issued ID' },
    { name: 'Sign Employee Handbook', department: 'HR', notes: 'Acknowledge policies' },
    // ... 7 more hardcoded tasks
];

// If no tasks provided, use these defaults
if (!dto.tasks || dto.tasks.length === 0) {
    use defaultTasks
}
```

---

## Why This Was Wrong

### Requirements State (ONB-001, BR 8, 11):
- **"Customizable checklists"**
- **"department-specific tasks"**
- **"support department-specific tasks and training plans"**

### The Problem:
If tasks are hardcoded, they are **NOT customizable**:
- ❌ Can't customize for different departments
- ❌ Can't customize for different roles
- ❌ Can't customize for different organizations
- ❌ Can't customize for different onboarding strategies

---

## The Fix

**Changed**: `createOnboarding()` in onboarding.service.ts

**Before**:
```typescript
// Initialize default tasks if not provided
const defaultTasks = [ /* 10 hardcoded tasks */ ];

const tasks = dto.tasks && dto.tasks.length > 0
    ? dto.tasks.map(...)
    : defaultTasks.map(...);  // ❌ Uses hardcoded defaults
```

**After**:
```typescript
// BR 8, 11: Customizable checklists - tasks must be provided or use a template
// TODO: Load default tasks from onboarding template configuration based on department/role
if (!dto.tasks || dto.tasks.length === 0) {
    throw new BadRequestException(
        'Onboarding tasks must be provided. Alternatively, load from template configuration (TODO: implement template system)'
    );
}

const tasks = dto.tasks.map(...);  // ✅ Uses provided tasks only
```

---

## What This Means

### Now Required:
- HR Manager MUST provide tasks when creating onboarding checklist
- Tasks can be completely customized per employee/department/role
- Different companies can have different task lists

### Future TODO:
- Implement template system to load default tasks from database/config
- Allow HR to define templates per department
- Allow HR to define templates per role
- Allow HR to define templates per organization

### API Usage:
```http
POST /onboarding
{
  "employeeId": "...",
  "contractId": "...",
  "tasks": [
    { "name": "Complete I-9 Form", "department": "HR", ... },
    { "name": "IT System Setup", "department": "IT", ... },
    // ... as many tasks as needed
  ]
}
```

**Tasks are now 100% customizable** ✅

---

## Updated Files

1. **`src/services/onboarding.service.ts`**
   - Removed hardcoded default tasks
   - Made tasks required (not optional)
   - Added TODO for template system

2. **`documentation/HTTP testing/onboarding.http`**
   - Updated test to provide explicit tasks
   - Added comment about customization requirement
   - Included comprehensive example task list

3. **`documentation/docs/VALIDATION-REPORT.md`**
   - Updated ONB-001 status to reflect correction
   - Noted that defaults were removed per requirement

---

## Requirements Compliance

### ✅ BR 8: Customizable Checklists
- Tasks are now **fully customizable**
- No hardcoded defaults that limit flexibility
- Each employee can have unique task list

### ✅ BR 11: Department-Specific Tasks
- Tasks can now specify any department
- Not limited to pre-defined list
- HR Manager has full control

### ✅ BR 11(a, b): Onboarding Workflow & Training Plans
- HR Manager can define training plans as tasks
- Can include department-specific training
- Can include role-specific training

---

## Migration Notes

If existing systems were using the hardcoded defaults, they will now need to:

1. **Provide tasks explicitly** when calling `POST /onboarding`
2. **Create templates** for commonly used task lists
3. **Implement template system** (marked as TODO in code)

---

## Examples of Customized Checklists

### Example 1: Software Engineer Onboarding
```json
{
  "employeeId": "...",
  "contractId": "...",
  "tasks": [
    { "name": "GitHub Repository Setup", "department": "IT", "notes": "Create account, grant access" },
    { "name": "AWS Environment Access", "department": "IT", "notes": "Setup AWS credentials" },
    { "name": "Code Review Training", "department": "Engineering", "notes": "Learn company standards" },
    { "name": "System Architecture Overview", "department": "Engineering", "notes": "Understand codebase" }
  ]
}
```

### Example 2: Sales Manager Onboarding
```json
{
  "employeeId": "...",
  "contractId": "...",
  "tasks": [
    { "name": "Sales Tool Setup", "department": "IT", "notes": "Salesforce, HubSpot" },
    { "name": "Territory Overview", "department": "Sales", "notes": "Account assignments" },
    { "name": "Product Training", "department": "Sales", "notes": "Deep dive into offerings" },
    { "name": "Client Relationship Review", "department": "Sales", "notes": "Key accounts intro" }
  ]
}
```

### Example 3: HR Analyst Onboarding
```json
{
  "employeeId": "...",
  "contractId": "...",
  "tasks": [
    { "name": "HRIS System Training", "department": "HR", "notes": "Employee data management" },
    { "name": "Payroll Process Overview", "department": "HR", "notes": "Monthly payroll cycle" },
    { "name": "Benefits Administration", "department": "HR", "notes": "Enrollment & changes" },
    { "name": "Compliance Training", "department": "HR", "notes": "Labor laws & policies" }
  ]
}
```

Each is **fully customized** for the role! ✅

---

## Conclusion

**Status**: ✅ **CORRECTED TO FULLY COMPLY WITH REQUIREMENTS**

The onboarding checklist system is now truly **customizable** as required by BR 8 and BR 11, allowing HR Managers to tailor onboarding tasks to each employee's needs, department, and role.


