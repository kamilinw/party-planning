import { Controller } from "@tsed/di";
import { Get, Post, Returns } from "@tsed/schema";
import { PartyDto } from "../models/dto/PartyDto";
import { PartyService } from "../service/PartyService";
import { Party } from "../models/entity/Party";
import { BodyParams, PathParams } from "@tsed/platform-params";

@Controller("/party")
export class PartyController {
  constructor(private partyService: PartyService) {}

  @Get("/:id")
  async getParty(@PathParams("id") id: string): Promise<Party> {
    const party = await this.partyService.getParty(id);
    return { ...party };
  }

  @Post("/")
  @Returns(201)
  async addParty(@BodyParams({ useValidation: true }) partyDto: PartyDto): Promise<Party> {
    const party = await this.partyService.createParty(partyDto);
    return { ...party };
  }
}
