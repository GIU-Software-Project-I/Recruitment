import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { MongooseModule } from "@nestjs/mongoose";

// Models
import { Application, ApplicationSchema } from "../models/application.schema";
import { ApplicationStatusHistory, ApplicationStatusHistorySchema } from '../models/application-history.schema';
import { AssessmentResult, AssessmentResultSchema } from "../models/assessment-result.schema";
import { ClearanceChecklist, ClearanceChecklistSchema } from "../models/clearance-checklist.schema";
import { JobTemplate, JobTemplateSchema } from '../models/job-template.schema';
import { JobRequisition, JobRequisitionSchema } from '../models/job-requisition.schema';
import { Referral, ReferralSchema } from '../models/referral.schema';
import { Interview, InterviewSchema } from '../models/intervies.schema';
import { Offer, OfferSchema } from "../models/offer.schema";
import { Contract, ContractSchema } from "../models/contract.schema";
import { Document, DocumentSchema } from "../models/document.schema";

// Controllers
import { RecruitmentController } from "../controllers/Recruitment/recruitment.controller";
import { OnBoardingController } from "../controllers/OnBoarding/initial-OnBoarding.controller";
import { OffBoardingController } from "../controllers/Offboarding/initial-OffBoarding.controller";

// Services
import { RecruitmentService } from "../services/Recruitment/recruitment.service";
import { OnBoardingService } from "../services/OnBoarding/initial-OnBoarding.service";
import { OffBoardingService } from "../services/OffBoarding/initial-OffBoarding.service";

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
            // Offboarding Models
            { name: ClearanceChecklist.name, schema: ClearanceChecklistSchema },
        ]),
    ],
    controllers: [RecruitmentController, OnBoardingController, OffBoardingController],
    providers: [RecruitmentService, OnBoardingService, OffBoardingService],
    exports: [RecruitmentService, OnBoardingService, OffBoardingService]
=======
import { MongooseModule } from '@nestjs/mongoose';
import { Application, ApplicationSchema } from '../models/application.schema';
import { ApplicationStatusHistory, ApplicationStatusHistorySchema } from '../models/application-history.schema';
import { AssessmentResult, AssessmentResultSchema } from '../models/assessment-result.schema';
import { ClearanceChecklist, ClearanceChecklistSchema } from '../models/clearance-checklist.schema';
import { Contract, ContractSchema } from '../models/contract.schema';
import { Document, DocumentSchema } from '../models/document.schema';
import { Onboarding, OnboardingSchema } from '../models/onboarding.schema';
import { TerminationRequest, TerminationRequestSchema } from '../models/termination-request.schema';

import { OnboardingService } from '../services/onboarding.service';
import { OffboardingService } from '../services/offboarding.service';
import { OnboardingController } from '../controllers/onboarding.controller';
import { OffboardingController } from '../controllers/offboarding.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
      { name: ApplicationStatusHistory.name, schema: ApplicationStatusHistorySchema },
      { name: AssessmentResult.name, schema: AssessmentResultSchema },
      { name: ClearanceChecklist.name, schema: ClearanceChecklistSchema },
      { name: Contract.name, schema: ContractSchema },
      { name: Document.name, schema: DocumentSchema },
      { name: Onboarding.name, schema: OnboardingSchema },
      { name: TerminationRequest.name, schema: TerminationRequestSchema },
    ]),
    //EmployeeProfileModule
  ],
  controllers: [OnboardingController, OffboardingController],
  providers: [OnboardingService, OffboardingService],
  exports: [OnboardingService, OffboardingService],
>>>>>>> 6a698a7b71f31565be4225e561ff1db9441154e5
})
export class RecruitmentModule {}
