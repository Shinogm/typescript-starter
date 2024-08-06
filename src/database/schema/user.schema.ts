import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserInterface } from 'src/api/user/interface/user.interface';

@Schema({
  collection: 'users',
  versionKey: false,
  timestamps: true,
})
export class UserSchemaDB implements UserInterface {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  lastName: string;

  @Prop({
    type: String,
    required: false,
  })
  phone?: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    default: 'user',
  })
  role: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaDB);
