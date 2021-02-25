import * as mongoose from 'mongoose';
import { levelEnum } from '../enums/lead-level.enum';
import { PositionSchema } from 'src/position/schemas/position.schema';

export const ProfileSchema = new mongoose.Schema({
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  avatarUrl: { type: String, default: null },
  uId: {
    type: mongoose.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'User',
  },
  age: { type: Number, default: null },
  dateOfbirth: { type: Date, default: null },
  salary: {
    from: { type: Number, default: 0 },
    to: { type: Number, default: 0 },
  },
  address: { type: String, default: '' },
  country: { type: String, default: '' },
  location: { type: String, default: '' },
  skills: { type: [String], default: [] },
  level: { type: String, enum: Object.values(levelEnum), required: true },
});

PositionSchema.index({ uId: 1 }, { unique: true });
