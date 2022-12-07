import { Default, Required } from "@tsed/schema";
import { MaxLength } from "class-validator";

export class TaskDto {
  @Required()
  @MaxLength(64)
  name: string;

  @MaxLength(256)
  description: string;

  plannedCost: number;

  actualCost: number;

  @Default(false)
  done: boolean;

  executionDate?: Date;
}
