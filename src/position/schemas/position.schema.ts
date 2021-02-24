import * as mongoose from 'mongoose';

export const PositionSchema = new mongoose.Schema({
  avatarUrl: { type: String, default: '' },
  title: { type: String, default: '' },
  subTitle: { type: String, default: '' },
  employment: [String],
  uId: {
    type: mongoose.Types.ObjectId,
    unique: false,
    required: true,
    ref: 'User',
  },
  salary: {
    from: { type: Number, default: 0 },
    to: { type: Number, default: 0 },
  },
  isHot: { type: Boolean, default: false },
  currency: { type: String, default: '' },
  bonus: { type: Number, default: 0 },
  location: { type: String, default: '' },
  country: { type: String, default: '' },
  description: { type: String, default: '' },
});

PositionSchema.index({ uId: 1 }, { unique: false });
