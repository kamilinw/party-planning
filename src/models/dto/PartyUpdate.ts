import { IsDateString, IsOptional, IsString } from "class-validator";

export class PartyUpdate {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsDateString()
  date: Date;
}
