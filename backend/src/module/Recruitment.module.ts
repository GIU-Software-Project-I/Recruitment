import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Models/Schemas
import { Onboarding, OnboardingSchema } from '../models/onboarding.schema';
import { Contract, ContractSchema } from '../models/contract.schema';
import { Document, DocumentSchema } from '../models/document.schema';
import { TerminationRequest, TerminationRequestSchema } from '../models/termination-request.schema';
import { ClearanceChecklist, ClearanceChecklistSchema } from '../models/clearance-checklist.schema';

// Consolidated Services
import { OnboardingService } from '../services/onboarding.service';
import { OffboardingService } from '../services/offboarding.service';

// Consolidated Controllers
import { OnboardingController } from '../controllers/onboarding.controller';
import { OffboardingController } from '../controllers/offboarding.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Onboarding.name, schema: OnboardingSchema },
      { name: Contract.name, schema: ContractSchema },
      { name: Document.name, schema: DocumentSchema },
      { name: TerminationRequest.name, schema: TerminationRequestSchema },
      { name: ClearanceChecklist.name, schema: ClearanceChecklistSchema },
    ]),
  ],
  providers: [OnboardingService, OffboardingService],
  controllers: [OnboardingController, OffboardingController],
  exports: [OnboardingService, OffboardingService],
})
export class RecruitmentModule {}

