
import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { RecycleTypeSchema } from './recycleTypes.schema';

export const MarkerSchema = new mongoose.Schema({
    id: {type: Number, unique:true},
    name: String,
    latitude: Number,
    longitude: Number,
    recycleType: RecycleTypeSchema,
    createdBy: Number
});
