import { Controller } from "@tsed/di";
import { Delete, Get, Post, Returns } from "@tsed/schema";
import { GuestFacade } from "../facades/GuestFacade";
import { Guest } from "../models/entity/Guest";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { GuestDto } from "../models/dto/GuestDto";

@Controller("/guest")
export class GuestController {
  constructor(private guestFacade: GuestFacade) {}

  @Get("/:id")
  getGuest(@PathParams("id") id: string): Promise<Guest> {
    return this.guestFacade.getGuest(id);
  }

  @Delete("/:id")
  async deleteGuest(@PathParams("id") id: string) {
    return await this.guestFacade.deleteGuest(id);
  }

  @Post("/")
  @Returns(201)
  addGuest(@BodyParams({ useValidation: true }) guestDto: GuestDto): Promise<Guest> {
    return this.guestFacade.createGuest(guestDto);
  }
}
