import { Module } from '@nestjs/common';
import { MarkerService } from './marker.service';
import { MarkerController } from './marker.controller';
import { MarkerSchema } from './schemas/marker.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RecycleTypeSchema } from './schemas/recycleTypes.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Marker', schema: MarkerSchema}])],
  providers: [MarkerService],
  controllers: [MarkerController],
  exports: [MarkerService],
})
export class MarkerModule {}
