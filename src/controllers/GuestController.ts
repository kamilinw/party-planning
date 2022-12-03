import { Controller } from "@tsed/di";
import { Post, Returns } from "@tsed/schema";
import { GuestService } from "../service/GuestService";
import { Guest } from "../models/entity/Guest";
import { BodyParams } from "@tsed/platform-params";
import { GuestDto } from "../models/dto/GuestDto";

@Controller("/guest")
export class GuestController {
  constructor(private guestService: GuestService) {}

  @Post("/")
  @Returns(201)
  async addGuest(@BodyParams({ useValidation: true }) guestDto: GuestDto): Promise<Guest> {
    const guest = await this.guestService.createGuest(guestDto);
    return { ...guest };
  }
}
