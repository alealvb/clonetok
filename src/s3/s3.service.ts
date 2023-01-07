import { Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
  async generateUploadVideoUrl(key: string, contentType: string) {
    return key;
  }
}
