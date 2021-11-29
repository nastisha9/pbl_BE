
import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { RecycleType } from '../entities/recycleType.entity';
import { RecycleTypeSchema } from './recycleTypes.schema';

export const MarkerSchema = new mongoose.Schema({
    name: String,
    latitude: Number,
    longitude: Number,
    type: {
        id: String,
        marker_color: String,
        label: String,
        description: String
    },
    recycleType: String,
    createdBy: Number,
});
