import { Controller } from "@tsed/di";
import { Get, Post, Returns } from "@tsed/schema";
import { PartyDto } from "../models/dto/PartyDto";
import { PartyFacade } from "../facades/PartyFacade";
import { Party } from "../models/entity/Party";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Guest } from "../models/entity/Guest";
import { guestCount } from "../models/dto/GuestCount";
import { Task } from "src/models/entity/Task";

@Controller("/party")
export class PartyController {
  constructor(private partyFacade: PartyFacade) {}

  @Get("/:id")
  getParty(@PathParams("id") id: string): Promise<Party> {
    return this.partyFacade.getParty(id);
  }
  @Get("/:id/plannedCost")
  getPlannedCost(@PathParams("id") id: string): Promise<Party> {
    return this.partyFacade.getParty(id);
  }

  @Get("/:id/guest")
  getAllGuests(@PathParams("id") id: string): Promise<Guest[]> {
    return this.partyFacade.getAllGuests(id);
  }

  @Get("/:id/guest/count")
  async getGuestsCount(@PathParams("id") id: string): Promise<guestCount> {
    const count = await this.partyFacade.getGuestsCount(id);
    return { numberOfGuests: count };
  }

  @Get("/:id/task")
  getAllTasks(@PathParams("id") id: string): Promise<Task[]> {
    return this.partyFacade.getAllTasks(id);
  }

  @Post("/")
  @Returns(201)
  addParty(@BodyParams({ useValidation: true }) partyDto: PartyDto): Promise<Party> {
    return this.partyFacade.createParty(partyDto);
  }
}
