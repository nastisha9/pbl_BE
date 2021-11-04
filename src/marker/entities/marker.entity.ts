import { Document } from 'mongoose';
import { RecycleType } from './recycleType.entity';

export class Marker extends Document{
    // id: Number;
    name: String;
    latitude: Number;
    longitude: Number;
    recycleType: String;
    createdBy: Number;
}
