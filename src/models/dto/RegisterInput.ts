import { IsEmail, IsString } from "class-validator";

export class RegisterInput {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
