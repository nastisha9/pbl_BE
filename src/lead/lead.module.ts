import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { LeadController } from './lead.controller';
import { LeadService } from './lead.service';

import { ProfileSchema } from './schemas/lead-profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }]),
  ],
  controllers: [LeadController],
  providers: [LeadService],
})
export class LeadModule {}
