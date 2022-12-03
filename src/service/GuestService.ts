import { Inject, Service } from "@tsed/di";
import { ResourceNotFoundException } from "../models/exception";
import { GuestDto } from "../models/dto/GuestDto";
import { GUEST_REPOSITORY } from "../repository/GuestRepository";

@Service()
export class GuestService {
  @Inject(GUEST_REPOSITORY)
  protected repository: GUEST_REPOSITORY;

  getGuest(id: string) {
    return this.repository.findOneByOrFail({ id }).catch((error) => {
      throw new ResourceNotFoundException(error.message);
    });
  }

  async createGuest(guestDto: GuestDto) {
    const confirmed = false;
    const result = await this.repository.create({ ...guestDto, confirmed });
    const guest = await this.repository.save(result);
    console.log("Guest id: ", guest.id);
    return guest;
  }
}
