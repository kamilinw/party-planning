import { Controller } from "@tsed/di";
import { Get, Post, Returns } from "@tsed/schema";
import { GuestService } from "../services/GuestService";
import { Guest } from "../models/entity/Guest";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { GuestDto } from "../models/dto/GuestDto";

@Controller("/guest")
export class GuestController {
  constructor(private guestService: GuestService) {}

  @Get("/:id")
  async getGuest(@PathParams("id") id: string): Promise<Guest> {
    const guest = await this.guestService.getGuest(id);
    return { ...guest };
  }

  @Post("/")
  @Returns(201)
  async addGuest(@BodyParams({ useValidation: true }) guestDto: GuestDto): Promise<Guest> {
    const guest = await this.guestService.createGuest(guestDto);
    return { ...guest };
  }
}
