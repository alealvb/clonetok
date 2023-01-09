import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AwsVideoWebhookService {
  constructor(private httpService: HttpService) {}

  async processSubcriptionConfirmation(message: any) {
    if (!message.SubscribeURL) {
      throw new BadRequestException('SubscribeURL is missing');
    }

    await lastValueFrom(this.httpService.get(message.SubscribeURL));
  }

  async processNotification(message: any) {
    console.log(message);
    const messageBody =
      typeof message.Message === 'string'
        ? JSON.parse(message.Message)
        : message.Message;
    const url = messageBody.Outputs.HLS_GROUP[0];
    console.log({ url });
  }
}
