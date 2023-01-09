import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AwsVideoWebhookController } from './aws-video-webhook.controller';
import { AwsVideoWebhookService } from './aws-video-webhook.service';

@Module({
  controllers: [AwsVideoWebhookController],
  imports: [HttpModule],
  providers: [AwsVideoWebhookService],
})
export class AwsVideoWebhookModule {}
