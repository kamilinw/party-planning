import { Controller } from "@tsed/di";
import { Get, Post, Returns } from "@tsed/schema";
import { GuestFacade } from "../facades/GuestFacade";
import { Guest } from "../models/entity/Guest";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { GuestDto } from "../models/dto/GuestDto";

@Controller("/guest")
export class GuestController {
  constructor(private guestFacade: GuestFacade) {}

  @Get("/:id")
  async getGuest(@PathParams("id") id: string): Promise<Guest> {
    const guest = await this.guestFacade.getGuest(id);
    return { ...guest };
  }

  @Post("/")
  @Returns(201)
  addGuest(@BodyParams({ useValidation: true }) guestDto: GuestDto): Promise<Guest> {
    return this.guestFacade.createGuest(guestDto);
  }
}
