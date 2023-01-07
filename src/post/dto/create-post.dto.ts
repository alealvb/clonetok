import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const postSchema = extendApi(
  z.object({
    id: z.number().int(),
    description: z.string().nullable(),
    videoUrl: z.string().nullable(),
    key: z.string(),
    status: z.enum(['DRAFT', 'PENDING', 'REJECTED', 'PUBLISHED']),
    authorId: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
  {
    description: 'A post',
  },
);

const createPostSchema = extendApi(
  postSchema
    .pick({
      description: true,
    })
    .extend({
      contentType: z.string(),
      extension: z.string(),
    }),
  {
    description: 'Create a post',
  },
);

export class CreatePostDto extends createZodDto(createPostSchema) {}
