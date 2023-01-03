import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const UserModel = z.object({
  id: z.number().int(),
  email: z.string().email(),
  name: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const UserSchema = extendApi(UserModel, {
  description: 'A user',
});

const createUser = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export class CreateUserDto extends createZodDto(createUser) {}

export class UpdateUserDto extends createZodDto(createUser.partial()) {}

export class ResponseUser extends createZodDto(UserModel) {}
