import { Service } from "@tsed/di";
import { ResourceNotFoundException } from "../models/exception";
import { GuestDto } from "../models/dto/GuestDto";
import { GuestMapper } from "../mappers/GuestMapper";
import { Guest } from "../models/entity/Guest";
import { GuestService } from "../services/GuestService";
import { PartyService } from "../services/PartyService";

@Service()
export class GuestFacade {
  constructor(private guestMapper: GuestMapper, private guestService: GuestService, private partyService: PartyService) {}

  async getGuestsByIds(guestIds: string[]): Promise<Guest[]> {
    const guests = await this.guestService.getGuestsByIds(guestIds);
    if (guests.length !== guestIds.length) {
      const foundIds = guests.map((guest) => guest.id);
      const notFoundIds = guestIds.filter((id) => foundIds.indexOf(id) < 0);
      throw new ResourceNotFoundException(`Could not find guests with ids: [${notFoundIds.join(", ")}]`);
    }
    return guests;
  }

  getGuest(id: string) {
    return this.guestService.getGuest(id);
  }

  getGuestCountWithPartyId(id: string) {
    return this.guestService.getGuestCountWithPartyId(id);
  }

  deleteGuest(id: string) {
    return this.guestService.deleteGuest(id);
  }

  async createGuest(guestDto: GuestDto) {
    const guest = this.guestMapper.toEntity(guestDto);
    guest.party = guestDto.partyId ? await this.partyService.getParty(guestDto.partyId) : undefined;

    return await this.guestService.saveGuest(guest);
  }
}
