import { Controller } from "@tsed/di";
import { BodyParams } from "@tsed/platform-params";
import { Post, Returns } from "@tsed/schema";
import { PartyDto } from "../models/dto/PartyDto";
import { PartyService } from "../service/PartyService";
import { Party } from "../models/entity/Party";

@Controller("/party")
export class PartyController {
  constructor(private partyService: PartyService) {}

  @Post("/")
  @Returns(201)
  async addParty(@BodyParams() partyDto: PartyDto): Promise<Party> {
    const party = await this.partyService.createParty(partyDto);
    return { ...party };
  }
}
