import { Service } from "@tsed/di";
import { PartyDto } from "../models/dto/PartyDto";
import { PartyMapper } from "../mappers/PartyMapper";
import { GuestService } from "../services/GuestService";
import { PartyService } from "../services/PartyService";

@Service()
export class PartyFacade {
  constructor(private partyMapper: PartyMapper, private guestService: GuestService, private partyService: PartyService) {}

  getParty(id: string) {
    return this.partyService.getParty(id);
  }

  getAllGuests(id: string) {
    return this.partyService.getAllGuests(id);
  }

  getGuestsCount(id: string) {
    return this.guestService.getGuestCountWithPartyId(id);
  }

  async createParty(partyDto: PartyDto) {
    const party = this.partyMapper.toEntity(partyDto);
    party.guests = partyDto.guestIds ? await this.guestService.getGuestsByIds(partyDto.guestIds) : undefined;

    return this.partyService.saveParty(party);
  }
}
