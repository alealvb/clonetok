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

const registerSchema = extendApi(
  z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string().optional(),
  }),
  {
    description: 'Login credentials',
  },
);

export class LoginDto extends createZodDto(loginSchema) {}

export class RegisterDto extends createZodDto(registerSchema) {}
