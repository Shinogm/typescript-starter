import { IsOptional, IsString } from 'class-validator';

export class CreateCookieDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly value: string;

  @IsOptional()
  readonly options?: {
    path?: string;
    httpOnly?: boolean;
    secure?: boolean;
    maxAge?: number;
  };
}
