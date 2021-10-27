
import * as mongoose from 'mongoose';
import { markerLabel } from '../enums/markerLabel.enum';

export const RecycleTypeSchema = new mongoose.Schema({
    id: {type: Number, unique:true},
    label: [markerLabel],
    marker_color: String,
    description: String,
});
