
import * as mongoose from 'mongoose';
import { markerLabel } from '../enums/markerLabel.enum';

export const RecycleTypeSchema = new mongoose.Schema({
    //id: {type: Number, unique:true},
    label: [{    
        type: String,
        enum: Object.values(markerLabel),
        }],
    marker_color: String,
    description: String,
});
