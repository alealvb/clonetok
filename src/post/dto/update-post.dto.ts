import { z } from 'zod';
import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';

const updatePostSchema = extendApi(
  z.object({
    description: z.string().nullable(),
  }),
  {
    description: 'Update a post',
  },
);

export class UpdatePostDto extends createZodDto(updatePostSchema) {}
