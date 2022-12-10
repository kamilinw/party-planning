import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class TaskUpdate {
  @IsOptional()
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
}
