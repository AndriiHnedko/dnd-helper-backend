import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserEntity } from '@prisma/client';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserEntity;
  },
);
