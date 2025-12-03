# Offboarding API Routes Documentation

## Base URL
`/offboarding`

---

## Termination Request Routes

### Create Termination Request (OFF-001)
**Endpoint**: `POST /offboarding/termination-requests`

**Description**: HR Manager initiates termination review based on warnings and performance data.

**Request Body**:
```json
{
  "employeeId": "string (MongoDB ObjectId)",
  "initiator": "employee | hr | manager",
  "reason": "string (required)",
  "employeeComments": "string (optional)",
  "hrComments": "string (optional)",
  "terminationDate": "string (ISO date, optional)",
  "contractId": "string (MongoDB ObjectId)"
}
```

**Response**: `201 Created`
```json
{
  "_id": "string",
  "employeeId": "string",
  "initiator": "string",
  "reason": "string",
  "status": "pending",
  "contractId": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

**Errors**:
- `404`: Contract not found
- `409`: Active termination request already exists

---

### Get All Termination Requests
**Endpoint**: `GET /offboarding/termination-requests`

**Query Parameters**:
- `employeeId`: Filter by employee ID (optional)
- `status`: Filter by status - pending, under_review, approved, rejected (optional)

**Response**: `200 OK`
```json
[
  {
    "_id": "string",
    "employeeId": { "populated object" },
    "initiator": "string",
    "reason": "string",
    "status": "string",
    "contractId": { "populated object" },
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

---

### Get Termination Request by ID
**Endpoint**: `GET /offboarding/termination-requests/:id`

**Path Parameters**:
- `id`: Termination request ID

**Response**: `200 OK`
```json
{
  "_id": "string",
  "employeeId": { "populated object" },
  "initiator": "string",
  "reason": "string",
  "employeeComments": "string",
  "hrComments": "string",
  "status": "string",
  "terminationDate": "string",
  "contractId": { "populated object" },
  "createdAt": "string",
  "updatedAt": "string"
}
```

**Errors**:
- `404`: Termination request not found

---

### Update Termination Status
**Endpoint**: `PATCH /offboarding/termination-requests/:id/status`

**Path Parameters**:
- `id`: Termination request ID

**Request Body**:
```json
{
  "status": "pending | under_review | approved | rejected",
  "hrComments": "string (optional)"
}
```

**Response**: `200 OK`
```json
{
  "_id": "string",
  "employeeId": "string",
  "status": "string",
  "hrComments": "string",
  "updatedAt": "string"
}
```

**Errors**:
- `404`: Termination request not found
- `400`: Cannot update finalized request

---

### Delete Termination Request
**Endpoint**: `DELETE /offboarding/termination-requests/:id`

**Path Parameters**:
- `id`: Termination request ID

**Response**: `200 OK`
```json
{
  "message": "Termination request deleted successfully",
  "deletedId": "string"
}
```

**Errors**:
- `404`: Termination request not found
- `400`: Cannot delete approved termination request

---

## Resignation Request Routes

### Create Resignation Request (OFF-018)
**Endpoint**: `POST /offboarding/resignation-requests`

**Description**: Employee submits resignation request with reasoning.

**Request Body**:
```json
{
  "employeeId": "string (MongoDB ObjectId)",
  "reason": "string (required)",
  "employeeComments": "string (optional)",
  "terminationDate": "string (ISO date, optional)",
  "contractId": "string (MongoDB ObjectId)"
}
```

**Response**: `201 Created`
```json
{
  "_id": "string",
  "employeeId": "string",
  "initiator": "employee",
  "reason": "string",
  "employeeComments": "string",
  "status": "pending",
  "terminationDate": "string",
  "contractId": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

**Errors**:
- `404`: Contract not found
- `409`: Active resignation/termination request already exists

---

### Track Resignation Status (OFF-019)
**Endpoint**: `GET /offboarding/resignation-requests/employee/:employeeId`

**Path Parameters**:
- `employeeId`: Employee ID

**Description**: Employee tracks their resignation request status.

**Response**: `200 OK`
```json
[
  {
    "_id": "string",
    "employeeId": "string",
    "initiator": "employee",
    "reason": "string",
    "status": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

---

## Clearance Checklist Routes

### Create Clearance Checklist (OFF-006)
**Endpoint**: `POST /offboarding/clearance-checklists`

**Description**: HR Manager creates offboarding checklist for asset recovery.

**Request Body**:
```json
{
  "terminationId": "string (MongoDB ObjectId)",
  "items": [
    {
      "department": "string",
      "comments": "string (optional)",
      "updatedBy": "string (optional)"
    }
  ],
  "equipmentList": [
    {
      "equipmentId": "string (optional)",
      "name": "string",
      "returned": "boolean",
      "condition": "string (optional)"
    }
  ],
  "cardReturned": "boolean (optional, default: false)"
}
```

**Response**: `201 Created`
```json
{
  "_id": "string",
  "terminationId": "string",
  "items": [
    {
      "department": "string",
      "status": "pending",
      "comments": "string",
      "updatedAt": "string"
    }
  ],
  "equipmentList": [],
  "cardReturned": false,
  "createdAt": "string",
  "updatedAt": "string"
}
```

**Errors**:
- `404`: Termination request not found
- `409`: Clearance checklist already exists

---

### Get All Clearance Checklists
**Endpoint**: `GET /offboarding/clearance-checklists`

**Response**: `200 OK`
```json
[
  {
    "_id": "string",
    "terminationId": { "populated object" },
    "items": [],
    "equipmentList": [],
    "cardReturned": false,
    "createdAt": "string"
  }
]
```

---

### Get Clearance Checklist by ID
**Endpoint**: `GET /offboarding/clearance-checklists/:id`

**Path Parameters**:
- `id`: Clearance checklist ID

**Response**: `200 OK`
```json
{
  "_id": "string",
  "terminationId": { "populated object" },
  "items": [
    {
      "department": "string",
      "status": "string",
      "comments": "string",
      "updatedBy": "string",
      "updatedAt": "string"
    }
  ],
  "equipmentList": [],
  "cardReturned": false
}
```

**Errors**:
- `404`: Clearance checklist not found

---

### Get Clearance Checklist by Termination ID
**Endpoint**: `GET /offboarding/clearance-checklists/termination/:terminationId`

**Path Parameters**:
- `terminationId`: Termination request ID

**Response**: `200 OK` (Same as Get by ID)

**Errors**:
- `404`: Clearance checklist not found

---

### Get Clearance Completion Status
**Endpoint**: `GET /offboarding/clearance-checklists/:id/status`

**Path Parameters**:
- `id`: Clearance checklist ID

**Response**: `200 OK`
```json
{
  "checklistId": "string",
  "allDepartmentsCleared": false,
  "allEquipmentReturned": false,
  "cardReturned": false,
  "fullyCleared": false,
  "pendingDepartments": ["IT", "Finance"],
  "pendingEquipment": ["Laptop Dell XPS 15", "Monitor"]
}
```

**Errors**:
- `404`: Clearance checklist not found

---

### Update Clearance Item (OFF-010)
**Endpoint**: `PATCH /offboarding/clearance-checklists/:id/items`

**Path Parameters**:
- `id`: Clearance checklist ID

**Description**: Department representative updates their clearance sign-off status.

**Request Body**:
```json
{
  "department": "string",
  "status": "approved | rejected | pending",
  "comments": "string (optional)",
  "updatedBy": "string (MongoDB ObjectId)"
}
```

**Response**: `200 OK`
```json
{
  "_id": "string",
  "terminationId": "string",
  "items": [
    {
      "department": "string",
      "status": "string",
      "comments": "string",
      "updatedBy": "string",
      "updatedAt": "string"
    }
  ]
}
```

**Errors**:
- `404`: Clearance checklist or department not found

---

### Update Equipment Item
**Endpoint**: `PATCH /offboarding/clearance-checklists/:id/equipment/:equipmentName`

**Path Parameters**:
- `id`: Clearance checklist ID
- `equipmentName`: Equipment name

**Request Body**:
```json
{
  "equipmentId": "string (optional)",
  "name": "string",
  "returned": "boolean",
  "condition": "string (optional)"
}
```

**Response**: `200 OK`
```json
{
  "_id": "string",
  "equipmentList": [
    {
      "equipmentId": "string",
      "name": "string",
      "returned": true,
      "condition": "string"
    }
  ]
}
```

**Errors**:
- `404`: Clearance checklist or equipment not found

---

### Add Equipment to Checklist
**Endpoint**: `POST /offboarding/clearance-checklists/:id/equipment`

**Path Parameters**:
- `id`: Clearance checklist ID

**Request Body**:
```json
{
  "equipmentId": "string (optional)",
  "name": "string",
  "returned": "boolean",
  "condition": "string (optional)"
}
```

**Response**: `200 OK`

**Errors**:
- `404`: Clearance checklist not found

---

### Update Access Card Return
**Endpoint**: `PATCH /offboarding/clearance-checklists/:id/card-return`

**Path Parameters**:
- `id`: Clearance checklist ID

**Request Body**:
```json
{
  "cardReturned": "boolean"
}
```

**Response**: `200 OK`
```json
{
  "_id": "string",
  "cardReturned": true
}
```

**Errors**:
- `404`: Clearance checklist not found

---

## Access Revocation & Final Settlement Routes

### Revoke System Access (OFF-007)
**Endpoint**: `POST /offboarding/revoke-access`

**Description**: System Admin revokes system and account access upon termination.

**Request Body**:
```json
{
  "employeeId": "string (MongoDB ObjectId)",
  "notes": "string (optional)"
}
```

**Response**: `200 OK`
```json
{
  "success": true,
  "employeeId": "string",
  "message": "System access revoked successfully. All accounts disabled.",
  "revokedAt": "string (ISO date)"
}
```

**Errors**:
- `400`: No approved termination request found

---

### Trigger Final Settlement (OFF-013)
**Endpoint**: `POST /offboarding/trigger-final-settlement`

**Description**: HR Manager triggers benefits termination and final pay calculation.

**Request Body**:
```json
{
  "terminationId": "string (MongoDB ObjectId)",
  "notes": "string (optional)"
}
```

**Response**: `200 OK`
```json
{
  "success": true,
  "terminationId": "string",
  "message": "Final settlement triggered. Benefits termination scheduled and final pay calculation initiated.",
  "triggeredAt": "string (ISO date)"
}
```

**Errors**:
- `404`: Termination request not found
- `400`: Termination not approved or clearance incomplete

---

## Status Codes

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid input or business rule violation
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource conflict (duplicate)

---

## Authentication & Authorization

All routes require authentication. Role-based access control:

- **HR Manager**: All termination routes, clearance creation, final settlement
- **Employee**: Resignation submission and tracking
- **System Admin**: Access revocation
- **Department Representatives**: Update clearance items for their department
- **Line Manager**: View and approve resignation requests

---

## Rate Limiting

Standard rate limiting applies:
- 100 requests per 15 minutes per user
- 1000 requests per hour per IP

---

## Swagger Documentation

All routes are documented with Swagger/OpenAPI decorators. Access the interactive API documentation at:
`http://localhost:3000/api`

