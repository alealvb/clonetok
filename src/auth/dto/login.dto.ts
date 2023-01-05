import { z } from 'zod';
import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';

const loginSchema = extendApi(
  z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  {
    description: 'Login credentials',
  },
);

const loginResponseSchema = z.object({
  token: z.string(),
});

export class LoginDto extends createZodDto(loginSchema) {}

export class LoginResponse extends createZodDto(loginResponseSchema) {}
