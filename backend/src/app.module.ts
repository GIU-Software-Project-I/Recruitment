import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import {OnboardingModule} from "./modules/Onboarding.Module";
import {RecruitmentModule} from "./modules/Recruitment.Module";


@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ScheduleModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                uri: config.get<string>('MONGODB_URI'),
            }),
            inject: [ConfigService],
        }),

//RecruitmentModule,
        //OnboardingModule
    ],
    // providers: [
    //     { provide: APP_GUARD, useClass: JwtAuthGuard },
    //     { provide: APP_GUARD, useClass: RolesGuard },
    // ],
})
export class AppModule {}