import { Module } from '@nestjs/common';
import { AwsVideoWebhookController } from './aws-video-webhook.controller';

@Module({ controllers: [AwsVideoWebhookController] })
export class AwsVideoWebhookModule {}
