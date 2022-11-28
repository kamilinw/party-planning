import { Required } from "@tsed/schema";

export class PartyDto {
  @Required()
  name: string;

  @Required()
  numberOfGuests: number;
}
