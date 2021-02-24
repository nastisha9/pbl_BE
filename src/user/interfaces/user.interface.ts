import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly email: string;
  readonly userName: string;
  status: string;
  readonly roles: Array<string>;
  readonly password: string;
}
