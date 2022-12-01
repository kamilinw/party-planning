import { Required } from "@tsed/schema";
import { IsDateString, IsEmail } from "class-validator";

export class PartyDto {
  @Required()
  name: string;

  @Required()
  @IsDateString()
  date: Date;

  @Required()
  @IsEmail({}, { message: "Email must be an valid email" })
  email: string;
}
