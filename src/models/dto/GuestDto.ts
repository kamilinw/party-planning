import { Required } from "@tsed/schema";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class GuestDto {
  @Required()
  @IsString()
  firstName: string;

  @Required()
  @IsString()
  lastName: string;

  @Required()
  @IsNumber()
  age: number;

  @Required()
  @IsBoolean()
  plusOne: boolean;
}
