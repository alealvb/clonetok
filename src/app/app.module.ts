import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { S3 } from 'aws-sdk';
import { AwsSdkModule } from 'nest-aws-sdk';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostModule } from 'src/post/post.module';
import { S3Module } from 'src/s3/s3.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    S3Module,
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useFactory: (config: ConfigService) => {
          return {
            region: 'us-east-1',
            credentials: {
              accessKeyId: config.get<string>('AWS_ACCESS_KEY_ID') as string,
              secretAccessKey: config.get<string>(
                'AWS_ACCESS_SECRET_KEY',
              ) as string,
            },
          };
        },
        imports: [ConfigModule],
        inject: [ConfigService],
      },
      services: [S3],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
