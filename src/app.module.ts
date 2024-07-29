import { Module } from '@nestjs/common';
import { GlobalConfigModule } from './global/global.module';

@Module({
  imports: [GlobalConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
