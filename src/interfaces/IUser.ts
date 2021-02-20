import { Document } from 'mongoose';
import DateTimeFormat = Intl.DateTimeFormat;

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  companyName: string;
  companyId?: string;
  country: string;
  activeToken: string | null;
  ip: string;
  userAgent?: string;
  userId: string;
  salt?: string;
  createdAt: DateTimeFormat;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  companyName: string;
  companyId?: string;
  country: string;
  activeToken: string | null;
  ip: string;
  userAgent?: string;
  userId?: string;
  salt?: string;
}
