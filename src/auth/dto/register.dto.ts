import { z } from 'zod';
import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';

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

const registerResponseSchema = z.object({
  token: z.string(),
});

export class RegisterDto extends createZodDto(registerSchema) {}

export class RegisterWithouPasswordDto extends createZodDto(
  registerSchema.omit({ password: true }),
) {}

export class RegisterResponse extends createZodDto(registerResponseSchema) {}
