import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

// Models
import { Application, ApplicationSchema } from "../models/application.schema";
import { ApplicationStatusHistory, ApplicationStatusHistorySchema } from '../models/application-history.schema';
import { AssessmentResult, AssessmentResultSchema } from "../models/assessment-result.schema";
import { ClearanceChecklist, ClearanceChecklistSchema } from "../models/clearance-checklist.schema";
import { JobTemplate, JobTemplateSchema } from '../models/job-template.schema';
import { JobRequisition, JobRequisitionSchema } from '../models/job-requisition.schema';
import { Referral, ReferralSchema } from '../models/referral.schema';
import { Interview, InterviewSchema } from '../models/interview.schema';
import { Offer, OfferSchema } from "../models/offer.schema";
import { Contract, ContractSchema } from "../models/contract.schema";
import { Document, DocumentSchema } from "../models/document.schema";
import { Onboarding, OnboardingSchema } from "../models/onboarding.schema";
import { TerminationRequest, TerminationRequestSchema } from "../models/termination-request.schema";

// Controllers
import { RecruitmentController } from "../controllers/recruitment.controller";
// import { OnboardingController } from "../controllers/onboarding-requirements.controller";
// import { OffboardingController } from "../controllers/offboarding-requirements.controller";

// Services
import { RecruitmentService } from "../services/recruitment.service";
// import { OnboardingService } from "../services/onboarding-requirements.service";
// import { OffboardingService } from "../services/offboarding-requirements.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            // Recruitment Models
            { name: JobTemplate.name, schema: JobTemplateSchema },
            { name: JobRequisition.name, schema: JobRequisitionSchema },
            { name: Application.name, schema: ApplicationSchema },
            { name: ApplicationStatusHistory.name, schema: ApplicationStatusHistorySchema },
            { name: Referral.name, schema: ReferralSchema },
            { name: Interview.name, schema: InterviewSchema },
            { name: AssessmentResult.name, schema: AssessmentResultSchema },
            { name: Offer.name, schema: OfferSchema },
            { name: Contract.name, schema: ContractSchema },
            { name: Document.name, schema: DocumentSchema },
            // Onboarding/Offboarding Models
            { name: ClearanceChecklist.name, schema: ClearanceChecklistSchema },
            { name: Onboarding.name, schema: OnboardingSchema },
            { name: TerminationRequest.name, schema: TerminationRequestSchema },
        ]),
    ],
    controllers: [RecruitmentController],
    providers: [RecruitmentService],
    exports: [RecruitmentService]
})
export class RecruitmentModule {}


//OnboardingController, OffboardingController
//OnboardingService, OffboardingService