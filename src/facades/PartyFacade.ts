import { Service } from "@tsed/di";
import { PartyDto } from "../models/dto/PartyDto";
import { PartyMapper } from "../mappers/PartyMapper";
import { GuestService } from "../services/GuestService";
import { PartyService } from "../services/PartyService";
import { TaskService } from "../services/TaskService";

@Service()
export class PartyFacade {
  constructor(
    private partyMapper: PartyMapper,
    private guestService: GuestService,
    private partyService: PartyService,
    private taskService: TaskService
  ) {}

  getParty(id: string) {
    return this.partyService.getParty(id);
  }

  getAllGuests(id: string) {
    return this.partyService.getAllGuests(id);
  }

  getPlannedCost(id: string) {
    return this.partyService.getParty(id);
  }

  getGuestsCount(id: string) {
    return this.guestService.getGuestCountWithPartyId(id);
  }

  getAllTasks(id: string) {
    return this.partyService.getAllTasks(id);
  }

  async createParty(partyDto: PartyDto) {
    const party = this.partyMapper.toEntity(partyDto);
    party.guests = partyDto.guestIds ? await this.guestService.getGuestsByIds(partyDto.guestIds) : undefined;

    return this.partyService.saveParty(party);
  }
}