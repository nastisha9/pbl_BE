
import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { RecycleTypeSchema } from './recycleTypes.schema';

export const MarkerSchema = new mongoose.Schema({
    name: String,
    latitude: Number,
    longitude: Number,
    recycleTypeNames: String,
    createdBy: Number
});
