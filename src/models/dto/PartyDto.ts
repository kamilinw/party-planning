import { Required } from "@tsed/schema";
import { IsArray, IsDateString, IsOptional, IsString } from "class-validator";

export class PartyDto {
  @Required()
  name: string;

  @Required()
  @IsDateString()
  date: Date;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  guestIds?: string[];
}
