# ✅ OFFBOARDING HTTP FILE UPDATED

## New Routes Added to offboarding.http

### Summary of Additions:

**Before**: ~30 test requests  
**After**: ~60+ test requests  

---

## New GET Routes Added:

### 1. Query Parameter Filters (Added to existing route)
```http
# By initiator
GET http://localhost:3000/offboarding/termination-requests?initiator=employee
GET http://localhost:3000/offboarding/termination-requests?initiator=hr
GET http://localhost:3000/offboarding/termination-requests?initiator=manager

# Combined filters
GET http://localhost:3000/offboarding/termination-requests?initiator=employee&status=approved
GET http://localhost:3000/offboarding/termination-requests?initiator=hr&status=pending
```

### 2. Get All Resignations (Convenience Endpoint)
```http
GET http://localhost:3000/offboarding/resignation-requests/all
GET http://localhost:3000/offboarding/resignation-requests/all?status=pending
GET http://localhost:3000/offboarding/resignation-requests/all?status=approved
GET http://localhost:3000/offboarding/resignation-requests/all?status=rejected
```

### 3. Get by Initiator (Dedicated Routes)
```http
GET http://localhost:3000/offboarding/termination-requests/by-initiator/employee
GET http://localhost:3000/offboarding/termination-requests/by-initiator/hr
GET http://localhost:3000/offboarding/termination-requests/by-initiator/manager

# With status filter
GET http://localhost:3000/offboarding/termination-requests/by-initiator/employee?status=pending
GET http://localhost:3000/offboarding/termination-requests/by-initiator/hr?status=approved
```

### 4. Get by Status (Dedicated Routes)
```http
GET http://localhost:3000/offboarding/termination-requests/by-status/pending
GET http://localhost:3000/offboarding/termination-requests/by-status/under_review
GET http://localhost:3000/offboarding/termination-requests/by-status/approved
GET http://localhost:3000/offboarding/termination-requests/by-status/rejected
```

---

## Rejection Examples Added:

### Reject Resignation (Insufficient Notice)
```http
PATCH http://localhost:3000/offboarding/termination-requests/:id/status
Content-Type: application/json

{
  "status": "rejected",
  "hrComments": "REJECTED - Insufficient notice period. Contract requires 30 days notice per clause 8.2. Employee provided only 14 days. Must extend resignation date to April 30, 2026 or arrange suitable replacement."
}
```

### Reject Termination (Insufficient Documentation)
```http
PATCH http://localhost:3000/offboarding/termination-requests/:id/status
Content-Type: application/json

{
  "status": "rejected",
  "hrComments": "REJECTED - Insufficient progressive discipline documentation. Manager must complete 90-day Performance Improvement Plan per policy HR-203. No documented warnings in past 12 months. Potential wrongful termination risk."
}
```

---

## Complete Test Coverage Now Includes:

### Termination/Resignation Creation
✅ Create HR-initiated termination  
✅ Create employee resignation  

### Getting All Requests - Multiple Ways
✅ Get all (no filters)  
✅ Get by employee ID  
✅ Get by status (query param)  
✅ Get by initiator (query param)  
✅ Get by combined filters  
✅ Get all resignations (convenience)  
✅ Get by initiator (dedicated route)  
✅ Get by status (dedicated route)  
✅ Get employee's own resignations  

### Status Updates
✅ Approve  
✅ Under review  
✅ Reject resignation  
✅ Reject termination  

### Clearance Checklists
✅ Create checklist  
✅ Get all checklists  
✅ Get by ID  
✅ Get by termination ID  
✅ Get completion status  
✅ Update department clearances  
✅ Update equipment returns  
✅ Update card return  

### Access & Settlement
✅ Revoke system access  
✅ Trigger final settlement  

---

## File Location
`D:\WebstormProjects\SubSystem 3\Recruitment\documentation\HTTP testing\offboarding.http`

## Ready to Test
All new routes are now documented and ready for testing in your HTTP client!

