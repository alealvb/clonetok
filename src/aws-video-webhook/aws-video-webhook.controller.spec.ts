import { Test, TestingModule } from '@nestjs/testing';
import { AwsVideoWebhookController } from './aws-video-webhook.controller';

describe('AwsVideoWebhookController', () => {
  let controller: AwsVideoWebhookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwsVideoWebhookController],
    }).compile();

    controller = module.get<AwsVideoWebhookController>(AwsVideoWebhookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
