import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PostModule } from 'src/post/post.module';
import { AwsVideoWebhookController } from './aws-video-webhook.controller';
import { AwsVideoWebhookService } from './aws-video-webhook.service';

@Module({
  controllers: [AwsVideoWebhookController],
  imports: [HttpModule, PostModule],
  providers: [AwsVideoWebhookService],
})
export class AwsVideoWebhookModule {}
