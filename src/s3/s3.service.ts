import { Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

type GenerateUploadUrlParams = {
  key: string;
  contentType: string;
};

@Injectable()
export class S3Service {
  constructor(
    @InjectAwsService(S3) private readonly s3: S3,
    private readonly config: ConfigService,
  ) {}

  async generateUploadUrl({ key, contentType }: GenerateUploadUrlParams) {
    const params = {
      Bucket: this.config.get<string>('AWS_BUCKET_NAME'),
      Key: key,
      Expires: 60 * 2,
      ContentType: contentType,
    };
    return this.s3.getSignedUrlPromise('putObject', params);
  }
}
