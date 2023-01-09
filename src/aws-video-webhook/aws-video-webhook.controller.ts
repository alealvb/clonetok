import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/public.decoreator';

@Controller('aws-video-webhook')
@Public()
export class AwsVideoWebhookController {
  @Post()
  async handleWebhook(@Body() body: string) {
    console.log(body);
  }
}
