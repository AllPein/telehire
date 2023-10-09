import {
  ContextType,
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

/**
 * Parameter decorator to provide the `CaslAbility` for the current user.
 * ```ts
 * ＠UseGuards(CaslGuard)
 * sample(＠CaslAbility() ability: AppAbility) { ... }
 * ```
 */
export const CaslAbility = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    let ability;

    ability = context.switchToHttp().getRequest().ability;

    if (!ability)
      throw new UnauthorizedException('No ability found for request');

    return ability;
  },
);
