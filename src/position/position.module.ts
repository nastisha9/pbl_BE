import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';

import { PositionSchema } from './schemas/position.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Position', schema: PositionSchema }]),
  ],
  controllers: [PositionController],
  providers: [PositionService],
})
export class PositionModule {}
