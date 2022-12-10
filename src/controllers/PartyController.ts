import { Controller } from "@tsed/di";
import { Delete, Get, Post, Put, Returns } from "@tsed/schema";
import { PartyDto } from "../models/dto/PartyDto";
import { PartyFacade } from "../facades/PartyFacade";
import { Party } from "../models/entity/Party";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Guest } from "../models/entity/Guest";
import { Task } from "../models/entity/Task";
import { DeleteResult, UpdateResult } from "typeorm";
import { PartyUpdate } from "../models/dto/PartyUpdate";

@Controller("/party")
export class PartyController {
  constructor(private partyFacade: PartyFacade) {}

  @Get("/:id")
  getParty(@PathParams("id") id: string): Promise<Party> {
    return this.partyFacade.getParty(id);
  }

  @Delete("/:id")
  deleteParty(@PathParams("id") id: string): Promise<DeleteResult> {
    return this.partyFacade.deleteParty(id);
  }

  @Get("/:id/guest")
  getAllGuests(@PathParams("id") id: string): Promise<Guest[]> {
    return this.partyFacade.getAllGuests(id);
  }

  @Put("/:id")
  updateParty(@PathParams("id") id: string, @BodyParams() partyUpdate: PartyUpdate): Promise<UpdateResult> {
    return this.partyFacade.updateParty(id, partyUpdate);
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
