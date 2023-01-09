import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { PostService } from 'src/post/post.service';

@Injectable()
export class AwsVideoWebhookService {
  constructor(
    private httpService: HttpService,
    private postService: PostService,
  ) {}

  async processSubcriptionConfirmation(message: any) {
    if (!message.SubscribeURL) {
      throw new BadRequestException('SubscribeURL is missing');
    }

    await lastValueFrom(this.httpService.get(message.SubscribeURL));
  }

  async processNotification(message: any) {
    const messageBody =
      typeof message.Message === 'string'
        ? JSON.parse(message.Message)
        : message.Message;
    const inputfile = messageBody.InputFile.split('/');
    const key = `${inputfile[inputfile.length - 2]}/${
      inputfile[inputfile.length - 1]
    }`;

    const post = await this.postService.findUnique({ key });

    if (!post) {
      throw new BadRequestException('Post not found');
    }
    const videoUrl = messageBody.Outputs.HLS_GROUP[0];

    await this.postService.update(post.id, { videoUrl, status: 'PUBLISHED' });

    // TODO: Send notification to user
  }
}
