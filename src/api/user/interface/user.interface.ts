import { Document } from 'mongoose';

export interface UserInterface extends Document {
  name: string;
  lastName: string;
  phone?: string;
  email: string;
  password: string;
}
