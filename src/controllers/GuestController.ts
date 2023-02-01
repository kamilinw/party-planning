import { Controller } from "@tsed/di";
import { Delete, Get, Patch, Post, Returns } from "@tsed/schema";
import { GuestFacade } from "../facades/GuestFacade";
import { Guest } from "../models/entity/Guest";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { GuestDto } from "../models/dto/GuestDto";
import { GuestUpdate } from "../models/dto/GuestUpdate";
import { DeleteResult, UpdateResult } from "typeorm";

@Controller("/guests")
export class GuestController {
  constructor(private guestFacade: GuestFacade) {}

  @Post("/")
  @Returns(201)
  async addGuest(@BodyParams({ useValidation: true }) guestDto: GuestDto): Promise<Guest> {
    return this.guestFacade.createGuest(guestDto);
  }

  @Get("/:id")
  async getGuest(@PathParams("id") id: string): Promise<Guest> {
    return this.guestFacade.getGuest(id);
  }

  @Delete("/:id")
  async deleteGuest(@PathParams("id") id: string): Promise<DeleteResult> {
    return this.guestFacade.deleteGuest(id);
  }

  @Patch("/:id")
  async updateGuest(@PathParams("id") id: string, @BodyParams() guestUpdate: GuestUpdate): Promise<UpdateResult> {
    return this.guestFacade.updateGuest(id, guestUpdate);
  }
}
