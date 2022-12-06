import { Inject, Service } from "@tsed/di";
import { ResourceNotFoundException } from "../models/exception";
import { PartyDto } from "../models/dto/PartyDto";
import { PARTY_REPOSITORY } from "../repositories/PartyRepository";
import { PartyMapper } from "../mappers/PartyMapper";
import { GuestService } from "./GuestService";

@Service()
export class PartyService {
  @Inject(PARTY_REPOSITORY)
  protected partyRepository: PARTY_REPOSITORY;

  constructor(private partyMapper: PartyMapper, private guestService: GuestService) {}

  getParty(id: string) {
    return this.partyRepository.findOneByOrFail({ id }).catch((error) => {
      throw new ResourceNotFoundException(error.message);
    });
  }

  getAllGuests(id: string) {
    return this.partyRepository
      .createQueryBuilder("party")
      .innerJoinAndSelect("party.guests", "guests")
      .where("party.id = :id", { id })
      .getOneOrFail()
      .then((party) => party.guests ?? [])
      .catch((error) => {
        throw new ResourceNotFoundException(error.message);
      });
  }

  getGuestsCount(id: string) {
    return this.guestService.getGuestCountWithPartyId(id);
  }

  async createParty(partyDto: PartyDto) {
    const party = this.partyMapper.toEntity(partyDto);
    party.guests = partyDto.guestIds ? await this.guestService.getGuestsByIds(partyDto.guestIds) : undefined;
    console.log("Guests: ", party.guests);
    const result = await this.partyRepository.create(party);
    const savedParty = await this.partyRepository.save(result);
    console.log("Party id: ", savedParty.id);
    return savedParty;
  }
}
