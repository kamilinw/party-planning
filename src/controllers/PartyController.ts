import { Controller } from "@tsed/di";
import { Delete, Get, Partial, Patch, Post, Returns } from "@tsed/schema";
import { PartyDto } from "../models/dto/PartyDto";
import { PartyFacade } from "../facades/PartyFacade";
import { Party } from "../models/entity/Party";
import { BodyParams, Context, PathParams } from "@tsed/platform-params";
import { Guest } from "../models/entity/Guest";
import { Task } from "../models/entity/Task";
import { DeleteResult, UpdateResult } from "typeorm";
import { PartyUpdate } from "../models/dto/PartyUpdate";
import { WithAuth } from "../decorators/WithAuth";
import { UserRoles } from "../models/enums/UserRoles";

const USER_ID_KEY = process.env.USER_ID_KEY ?? "user_id";

@Controller("/parties")
@WithAuth({ roles: [UserRoles.USER] })
export class PartyController {
  constructor(private partyFacade: PartyFacade) {}

  @Post("/")
  @Returns(201)
  addParty(@BodyParams({ useValidation: true }) partyDto: PartyDto, @Context(USER_ID_KEY) userId: string): Promise<Party> {
    return this.partyFacade.createParty(partyDto, userId);
  }

  @Get("/:id")
  getParty(@PathParams("id") id: string): Promise<Party> {
    return this.partyFacade.getParty(id);
  }

  @Delete("/:id")
  deleteParty(@PathParams("id") id: string): Promise<DeleteResult> {
    return this.partyFacade.deleteParty(id);
  }

  @Patch("/:id")
  updateParty(@PathParams("id") id: string, @BodyParams() @Partial() partyUpdate: PartyUpdate): Promise<UpdateResult> {
    return this.partyFacade.updateParty(id, partyUpdate);
  }

  @Get("/:id/guests")
  getAllGuests(@PathParams("id") id: string): Promise<Guest[]> {
    return this.partyFacade.getAllGuests(id);
  }

  @Get("/:id/tasks")
  getAllTasks(@PathParams("id") id: string): Promise<Task[]> {
    return this.partyFacade.getAllTasks(id);
  }
}
