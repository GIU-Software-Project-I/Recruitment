# HR Recruitment System - Backend Project Structure

## 🎯 System Overview

This NestJS-based HR Management System handles the complete employee lifecycle: **Recruitment → Onboarding → Offboarding**. The system manages job postings, candidate applications, interview processes, offer management, new hire onboarding, and employee separation processes.

## 📋 Core Business Requirements

### **Phase 1: Recruitment Process**
- **Job Design & Posting**: Standardized templates, hiring process automation
- **Candidate Management**: CV uploads, application tracking, status updates
- **Interview Coordination**: Scheduling, panel management, feedback collection
- **Assessment & Scoring**: Structured evaluation forms, candidate ranking
- **Offer Management**: Electronic signatures, approval workflows
- **Analytics**: Progress monitoring, reporting capabilities

### **Phase 2: Onboarding Process**
- **Task Management**: Automated checklists, department-specific tasks
- **Document Collection**: Compliance documents, contract management
- **Resource Provisioning**: System access, equipment allocation
- **Payroll Integration**: Automatic payroll initiation, signing bonuses

### **Phase 3: Offboarding Process**
- **Termination/Resignation**: Request tracking, approval workflows
- **Asset Recovery**: IT equipment, access cards, clearance checklists
- **Access Revocation**: System security, account deactivation
- **Final Settlements**: Benefits termination, unused leave calculation

---

## 🏗️ Project Architecture

```
backend/
├── src/
│   ├── app.module.ts                    # Main application module
│   ├── main.ts                         # Application bootstrap
│   ├── index.ts                        # Export barrel
│   │
│   ├── controllers/                    # API Controllers Layer
│   │   ├── Recruitment/
│   │   │   └── recruitment.controller.ts
│   │   ├── OnBoarding/
│   │   │   └── onboarding.controller.ts
│   │   └── OffBoarding/
│   │       └── offboarding.controller.ts
│   │
│   ├── services/                       # Business Logic Layer
│   │   ├── Recruitment/
│   │   │   └── recruitment.service.ts
│   │   ├── OnBoarding/
│   │   │   └── onboarding.service.ts
│   │   └── OffBoarding/
│   │       └── offboarding.service.ts
│   │
│   ├── dto/                           # Data Transfer Objects
│   │   ├── recruitment/
│   │   │   ├── create-application.dto.ts
│   │   │   ├── create-job-requisition.dto.ts
│   │   │   ├── schedule-interview.dto.ts
│   │   │   ├── submit-feedback.dto.ts
│   │   │   └── create-offer.dto.ts
│   │   ├── onboarding/
│   │   │   ├── create-onboarding.dto.ts
│   │   │   ├── update-task.dto.ts
│   │   │   └── upload-document.dto.ts
│   │   └── offboarding/
│   │       ├── initiate-termination.dto.ts
│   │       ├── resignation-request.dto.ts
│   │       └── clearance-update.dto.ts
│   │
│   ├── models/                        # MongoDB Schemas
│   │   ├── job-template.schema.ts     # REC-003: Job description templates
│   │   ├── job-requisition.schema.ts  # REC-004: Job postings & openings
│   │   ├── application.schema.ts      # REC-007, REC-008: Applications & tracking
│   │   ├── application-history.schema.ts # REC-017: Status change history
│   │   ├── referral.schema.ts         # REC-030: Employee referral system
│   │   ├── intervies.schema.ts        # REC-010, REC-011: Interview management
│   │   ├── assessment-result.schema.ts # REC-020: Structured evaluations
│   │   ├── offer.schema.ts            # REC-014, REC-018: Offer management
│   │   ├── contract.schema.ts         # REC-029: Signed contracts
│   │   ├── document.schema.ts         # ONB-007: Document uploads
│   │   ├── onboarding.schema.ts       # ONB-001, ONB-004: Task management
│   │   ├── clearance-checklist.schema.ts # OFF-006, OFF-010: Exit clearance
│   │   └── termination-request.schema.ts # OFF-001, OFF-018: Separation requests
│   │
│   ├── enums/                         # System Constants
│   │   ├── application-stage.enum.ts  # Screening → Interview → Offer → Hired
│   │   ├── application-status.enum.ts # Submitted → In Process → Hired/Rejected
│   │   ├── interview-method.enum.ts   # In-person, Video, Phone
│   │   ├── interview-status.enum.ts   # Scheduled, Completed, Cancelled
│   │   ├── offer-response-status.enum.ts # Pending, Accepted, Declined
│   │   ├── offer-final-status.enum.ts # Approved, Rejected, Withdrawn
│   │   ├── onboarding-task-status.enum.ts # Pending, In Progress, Completed
│   │   ├── termination-initiation.enum.ts # Employee, Manager, HR
│   │   ├── termination-status.enum.ts # Pending, Approved, Completed
│   │   ├── approval-status.enum.ts    # Pending, Approved, Rejected
│   │   └── document-type.enum.ts      # CV, Contract, ID, Certification
│   │
│   ├── module/
│   │   └── Recruitment.module.ts      # Feature module configuration
│   │
│   ├── guards/                        # Authentication & Authorization
│   │   ├── jwt-auth.guard.ts
│   │   └── roles.guard.ts
│   │
│   ├── decorators/                    # Custom decorators
│   │   └── roles.decorator.ts
│   │
│   ├── interfaces/                    # TypeScript interfaces
│   │   ├── candidate.interface.ts
│   │   ├── user.interface.ts
│   │   └── workflow.interface.ts
│   │
│   ├── utils/                         # Helper functions
│   │   ├── email.util.ts
│   │   ├── file-upload.util.ts
│   │   └── date.util.ts
│   │
│   └── config/                        # Configuration files
│       ├── database.config.ts
│       └── swagger.config.ts
│
├── docs/                              # API Documentation
├── tests/                             # Test files
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript configuration
├── nest-cli.json                      # NestJS CLI configuration
└── eslint.config.mjs                  # Linting rules
```

---

## 🔄 Workflow Implementation

### **Phase 1: Recruitment Pipeline**

#### **1. Job Management (REC-003, REC-004, REC-023)**
```typescript
POST   /api/recruitment/job-templates          # Create standardized templates
POST   /api/recruitment/job-requisitions       # Create job openings
GET    /api/recruitment/job-requisitions       # List active positions
PUT    /api/recruitment/job-requisitions/:id/publish # Publish to careers page
```

#### **2. Application Processing (REC-007, REC-028, REC-030)**
```typescript
POST   /api/recruitment/applications           # Submit application + CV
POST   /api/recruitment/applications/:id/consent # GDPR compliance
POST   /api/recruitment/referrals              # Tag referral candidates
GET    /api/recruitment/applications           # Track candidate pipeline
```

#### **3. Interview Management (REC-008, REC-010, REC-011, REC-021)**
```typescript
POST   /api/recruitment/interviews             # Schedule interviews
PUT    /api/recruitment/interviews/:id/panel   # Assign panel members
POST   /api/recruitment/interviews/:id/feedback # Submit evaluations
GET    /api/recruitment/applications/:id/progress # Track stages
```

#### **4. Assessment & Scoring (REC-020)**
```typescript
POST   /api/recruitment/assessments            # Create structured forms
POST   /api/recruitment/assessments/:id/score  # Submit candidate scores
GET    /api/recruitment/assessments/rankings   # View ranked candidates
```

#### **5. Offer Management (REC-014, REC-018, REC-022)**
```typescript
POST   /api/recruitment/offers                 # Create job offers
PUT    /api/recruitment/offers/:id/approve     # Approval workflow
POST   /api/recruitment/offers/:id/send        # Send electronic signature
PUT    /api/recruitment/offers/:id/sign        # Candidate acceptance
POST   /api/recruitment/notifications/reject   # Automated rejections
```

### **Phase 2: Onboarding Automation**

#### **6. Profile & Task Setup (ONB-001, ONB-002, REC-029)**
```typescript
POST   /api/onboarding/profiles               # Create employee profile
POST   /api/onboarding/checklists             # Generate task lists
GET    /api/onboarding/tasks                  # View onboarding tracker
PUT    /api/onboarding/tasks/:id              # Update task status
```

#### **7. Document & Compliance (ONB-007)**
```typescript
POST   /api/onboarding/documents              # Upload compliance docs
GET    /api/onboarding/documents/status       # Verify completion
```

#### **8. Resource Provisioning (ONB-009, ONB-012, ONB-013)**
```typescript
POST   /api/onboarding/system-access          # IT account creation
POST   /api/onboarding/equipment              # Reserve desk/equipment
POST   /api/onboarding/access-cards           # Generate badges
```

#### **9. Payroll Integration (ONB-018, ONB-019)**
```typescript
POST   /api/onboarding/payroll/initiate       # Auto payroll setup
POST   /api/onboarding/bonuses                # Process signing bonuses
```

### **Phase 3: Offboarding Process**

#### **10. Separation Initiation (OFF-001, OFF-018, OFF-019)**
```typescript
POST   /api/offboarding/resignation           # Employee resignation
POST   /api/offboarding/termination           # Manager-initiated termination
GET    /api/offboarding/requests/:id/status   # Track request status
```

#### **11. Clearance Management (OFF-006, OFF-010)**
```typescript
POST   /api/offboarding/clearance             # Start clearance process
PUT    /api/offboarding/clearance/:id/approve # Department sign-offs
GET    /api/offboarding/clearance/:id         # View clearance status
```

#### **12. Security & Settlements (OFF-007, OFF-013)**
```typescript
DELETE /api/offboarding/access/:employeeId    # Revoke system access
POST   /api/offboarding/final-settlement      # Calculate final pay
```

---

## 📊 Data Models & Relationships

### **Core Entity Relationships**
```
JobTemplate (1) → (N) JobRequisition
JobRequisition (1) → (N) Application
Application (1) → (N) Interview
Application (1) → (1) Offer
Offer (1) → (1) Contract
Contract (1) → (1) Onboarding
User (1) → (1) TerminationRequest
TerminationRequest (1) → (N) ClearanceChecklist
```

### **Key Schema Features**
- **Timestamps**: All schemas include `createdAt` and `updatedAt`
- **References**: MongoDB ObjectId relationships between entities
- **Enums**: Strict type safety for status fields
- **Embedded Documents**: Complex nested data (tasks, approvals, feedback)
- **Indexes**: Optimized for frequent queries (status, dates, IDs)

---

## 🔧 Technical Implementation

### **Database Configuration**
```typescript
// MongoDB with Mongoose ODM
MongooseModule.forRootAsync({
  useFactory: async (config: ConfigService) => ({
    uri: config.get<string>('MONGODB_URI'),
  }),
})
```

### **Authentication & Authorization**
```typescript
// JWT-based authentication with role-based access
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('hr-manager', 'hr-employee', 'hiring-manager')
```

### **Validation & DTOs**
```typescript
// Class-validator for request validation
export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  candidateId: string;

  @IsString()
  @IsNotEmpty()
  requisitionId: string;
}
```

### **API Documentation**
```typescript
// Swagger/OpenAPI integration
@ApiTags('recruitment')
@ApiOperation({ summary: 'Create job application' })
@ApiResponse({ status: 201, description: 'Application created successfully' })
```

---

## 🚀 Development Guidelines

### **Code Organization**
- **Modular Architecture**: Feature-based modules (Recruitment, Onboarding, Offboarding)
- **Separation of Concerns**: Controllers → Services → Repositories
- **Type Safety**: Full TypeScript implementation with strict typing
- **Error Handling**: Global exception filters and custom error responses

### **API Standards**
- **RESTful Design**: Standard HTTP methods and status codes
- **Consistent Naming**: kebab-case for endpoints, camelCase for properties
- **Pagination**: Cursor-based pagination for large datasets
- **Filtering**: Query parameters for search and filtering

### **Security Implementation**
- **Authentication**: JWT tokens with refresh mechanism
- **Authorization**: Role-based access control (RBAC)
- **Data Validation**: Input sanitization and validation
- **CORS Configuration**: Secure cross-origin requests

### **Performance Optimization**
- **Database Indexes**: Optimized queries for frequent operations
- **Caching**: Redis for session management and temporary data
- **File Upload**: Multer for document handling with size limits
- **Background Jobs**: Queue processing for email notifications

---

## 📈 Business Intelligence & Analytics

### **Recruitment Metrics (REC-009)**
- Time-to-hire tracking
- Source effectiveness analysis
- Candidate pipeline conversion rates
- Interview-to-offer ratios

### **Onboarding Efficiency**
- Task completion rates
- Time-to-productivity metrics
- Document compliance tracking
- Resource allocation efficiency

### **Offboarding Analytics**
- Voluntary vs. involuntary turnover
- Exit reason categorization
- Asset recovery completion rates
- Final settlement processing time

---

## 🔄 Integration Points

### **External Systems**
- **Email Service**: Nodemailer for automated notifications
- **Calendar Integration**: Google Calendar/Outlook for interview scheduling
- **Document Storage**: AWS S3 or local file system for CV/document uploads
- **Payroll System**: API integration for salary processing
- **HRIS Integration**: Employee profile synchronization

### **Internal Modules**
- **Employee Profile**: User management and organizational structure
- **Performance Management**: Integration for termination decisions
- **Time Management**: Clock-in/out system access provisioning
- **Payroll Module**: Automated salary and bonus processing

---

This structure provides a comprehensive foundation for implementing the complete HR recruitment system with all specified business requirements and technical best practices.