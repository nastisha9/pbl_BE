import * as mongoose from 'mongoose';
import { roleEnum } from '../enums/role.enum';
import { statusEnum } from '../enums/status.enum';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  userName: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(statusEnum),
    default: statusEnum.pending,
  },
  roles: { type: [String], required: true, enum: Object.values(roleEnum) },
  password: { type: String, required: true },
});

UserSchema.index({ email: 1 }, { unique: true });
