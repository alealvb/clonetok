import { createZodDto } from '@anatine/zod-nestjs';
import { createUserSchema } from './createUser.dto';

export class UpdateUserDto extends createZodDto(createUserSchema.partial()) {}
