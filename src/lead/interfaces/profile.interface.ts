import { Document } from 'mongoose';

export interface IProfile extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly avatarUrl: string;
  readonly age: number;
  readonly dateOfbirth: Date;
  readonly salary: {
    from: number;
    to: number;
  };
  readonly address: string;
  readonly country: string;
  readonly location: string;
  readonly skills: string[];
  readonly level: string;
}
