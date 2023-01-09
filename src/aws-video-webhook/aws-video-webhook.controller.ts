import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/public.decoreator';
import { AwsVideoWebhookService } from './aws-video-webhook.service';

export enum SNSNotificationType {
  NOTIFICATION = 'Notification',
  SUBSCRIPTION_CONFIRMATION = 'SubscriptionConfirmation',
}

@Controller('aws-video-webhook')
@Public()
export class AwsVideoWebhookController {
  constructor(private awsVideWebhookService: AwsVideoWebhookService) {}
  @Post()
  async handleWebhook(@Body() body: string) {
    const payload = JSON.parse(body);
    switch (payload.Type) {
      case SNSNotificationType.NOTIFICATION:
        this.awsVideWebhookService.processNotification(payload);
        break;
      case SNSNotificationType.SUBSCRIPTION_CONFIRMATION:
        this.awsVideWebhookService.processSubcriptionConfirmation(payload);
        break;
      default:
        throw new BadRequestException('Type is missing or invalid');
        break;
    }
  }
}
