import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty()
  token: string;

  @ApiProperty({
    example: 1651623889,
  })
  tokenExpires: number;
}
