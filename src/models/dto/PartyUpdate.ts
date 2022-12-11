import { Required } from "@tsed/schema";
import { IsDateString, IsOptional, IsString} from "class-validator";

export class PartyUpdate {
  @IsOptional()
  @IsString()
  name: string;

  @Required()
  @IsDateString()
  date: Date;
}
