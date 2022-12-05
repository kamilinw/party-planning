import { Inject, Service } from "@tsed/di";
import { ResourceNotFoundException } from "../models/exception";
import { PartyDto } from "../models/dto/PartyDto";
import { PARTY_REPOSITORY } from "../repository/PartyRepository";
import { PartyMapper } from "../mapper/PartyMapper";
import { GuestService } from "./GuestService";

@Service()
export class PartyService {
  @Inject(PARTY_REPOSITORY)
  protected repository: PARTY_REPOSITORY;

  constructor(private partyMapper: PartyMapper, private guestService: GuestService) {}

  getParty(id: string) {
    return this.repository.findOneByOrFail({ id }).catch((error) => {
      throw new ResourceNotFoundException(error.message);
    });
  }

  getAllGuests(id: string) {
    return this.repository
      .createQueryBuilder("party")
      .innerJoinAndSelect("party.guests", "guests")
      .where("party.id = :id", { id })
      .getOneOrFail()
      .then((party) => party.guests ?? [])
      .catch((error) => {
        throw new ResourceNotFoundException(error.message);
      });
  }

  async createParty(partyDto: PartyDto) {
    const party = this.partyMapper.toEntity(partyDto);
    party.guests = partyDto.guestIds ? await this.guestService.getGuestsByIds(partyDto.guestIds) : undefined;
    console.log("Guests: ", party.guests);
    const result = await this.repository.create(party);
    const savedParty = await this.repository.save(result);
    console.log("Party id: ", savedParty.id);
    return savedParty;
  }
}
