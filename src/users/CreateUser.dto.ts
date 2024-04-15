import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  avatar: string;
}
