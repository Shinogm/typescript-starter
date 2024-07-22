import { Connection } from 'mongoose';
import { UserSchema } from 'src/database/schema/user.schema';

export const userProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection): mongoose.Model<any> =>
      connection.model('User', UserSchema),
  },
];
