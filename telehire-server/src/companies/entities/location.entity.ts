import { IsNotEmpty, IsOptional } from 'class-validator';

export class Location {
  @IsNotEmpty()
  @IsOptional()
  city?: string;

  @IsNotEmpty()
  country: string;
}
