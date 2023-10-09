import { Profile } from '@prisma/client';

export type JwtPayloadType = Pick<Profile, 'id'> & {
  iat: number;
  exp: number;
};

export type TwaPayloadType = Pick<Profile, 'id'> & {
  iat: number;
  exp: number;
};
