import { Required } from "@tsed/schema";
import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

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

  @IsOptional()
  @IsBoolean()
  confirmed: boolean;

  @Required()
  @IsUUID()
  partyId?: string;
}
