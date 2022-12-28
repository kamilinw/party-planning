import { Service } from "@tsed/di";
import { PartyDto } from "../models/dto/PartyDto";
import { PartyMapper } from "../mappers/PartyMapper";
import { GuestService } from "../services/GuestService";
import { PartyService } from "../services/PartyService";
import { PartyUpdate } from "../models/dto/PartyUpdate";
import { UserService } from "../services/UserService";

@Service()
export class PartyFacade {
  constructor(
    private partyMapper: PartyMapper,
    private guestService: GuestService,
    private partyService: PartyService,
    private userService: UserService
  ) {}

  getParty(id: string) {
    return this.partyService.getParty(id);
  }

  deleteParty(id: string) {
    return this.partyService.deleteParty(id);
  }

  getAllGuests(id: string) {
    return this.partyService.getAllGuests(id);
  }

  updateParty(id: string, partyUpdate: PartyUpdate) {
    return this.partyService.updateParty(id, partyUpdate);
  }

  getAllTasks(id: string) {
    return this.partyService.getAllTasks(id);
  }

  async createParty(partyDto: PartyDto, userId: string) {
    const party = this.partyMapper.toEntity(partyDto);
    party.host = await this.userService.getById(userId);
    party.guests = partyDto.guestIds ? await this.guestService.getGuestsByIds(partyDto.guestIds) : undefined;

    return this.partyService.saveParty(party);
  }
}
