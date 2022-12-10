import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class GuestUpdate {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsBoolean()
  confirmed: boolean;

  @IsOptional()
  @IsBoolean()
  plusOne: boolean;
}
