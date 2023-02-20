import { IsNotEmpty, IsEmail, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  static get expectedKeys(): string[] {
    return ['id', 'name', 'email'];
  }
}

export class UpdateUserPartiallyDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly id?: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly name?: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email?: string;
}
