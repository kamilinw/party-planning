import { Required } from "@tsed/schema";
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class TaskDto {
  @Required()
  @IsString()
  @MaxLength(64)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  description?: string;

  @IsOptional()
  @IsNumber()
  plannedCost?: number;

  @IsOptional()
  @IsNumber()
  actualCost?: number;

  @IsOptional()
  @IsBoolean()
  done?: boolean;

  @IsOptional()
  @IsDateString()
  executionDate?: Date;

  @Required()
  @IsUUID()
  partyId: string;
}
