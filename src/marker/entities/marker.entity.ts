import { Document } from 'mongoose';
import { RecycleType } from './recycleType.entity';

export class Marker extends Document{
    name: String;
    latitude: Number;
    longitude: Number;
    type: RecycleType;
    recycleType: String;
    createdBy: Number;
}
