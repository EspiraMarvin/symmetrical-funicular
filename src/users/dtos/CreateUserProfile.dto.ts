import { IsNumber, IsString } from 'class-validator';

export class UserProfileDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  age: number;

  @IsString()
  dob: string;
}
