import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import crypto from 'crypto';
import { Post, Prisma } from '@prisma/client';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService, private s3: S3Service) {}

  async create(
    createPostDto: CreatePostDto,
    userId: number,
  ): Promise<{ post: Post; uploadUrl: string }> {
    const uuid = crypto.randomUUID();

    const { contentType, extension, ...postPayload } = createPostDto;
    const key = `assets01/${uuid}.${extension}`;

    const post = await this.prisma.post.create({
      data: {
        ...postPayload,
        authorId: userId,
        key,
      },
    });

    const uploadUrl = await this.s3.generateUploadUrl({ key, contentType });

    return { post, uploadUrl };
  }

  findAll() {
    return this.prisma.post.findMany();
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  update(id: number, updatePostDto: Prisma.PostUpdateInput) {
    return this.prisma.post.update({ where: { id }, data: updatePostDto });
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  findUnique(where: Prisma.PostWhereUniqueInput) {
    return this.prisma.post.findUnique({ where });
  }
}
