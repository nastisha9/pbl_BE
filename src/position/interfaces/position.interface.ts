import { Document } from 'mongoose';

export interface IPosition extends Document {
  readonly avatarUrl: string;
  readonly title: string;
  readonly subTitle: string;
  readonly employment: string[];
  readonly uId: string;
  readonly salary: {
    from: number;
    to: number;
  };
  readonly isHot: boolean;
  readonly currency: string;
  readonly bonus: number;
  readonly location: string;
  readonly country: string;
  readonly description: string;
}
