import mongoose, { Connection } from 'mongoose';
import { userSchema } from 'src/database/schema/user.schema';

export const userProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection): mongoose.Model<any> =>
      connection.model('User', userSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
