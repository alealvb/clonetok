import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AppService } from './app.service';

@Module({
  imports: [UsersModule],
  providers: [AppService],
})
export class AppModule {}
