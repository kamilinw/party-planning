import { Inject, Service } from "@tsed/di";
import { ResourceNotFoundException } from "../models/exception";
import { GuestDto } from "../models/dto/GuestDto";
import { GUEST_REPOSITORY } from "../repository/GuestRepository";
import { PARTY_REPOSITORY } from "../repository/PartyRepository";
import { GuestMapper } from "../mapper/GuestMapper";
import { Guest } from "src/models/entity/Guest";
import { In } from "typeorm";

@Service()
export class GuestService {
  @Inject(GUEST_REPOSITORY)
  protected guestRepository: GUEST_REPOSITORY;

  @Inject(PARTY_REPOSITORY)
  protected partyRepository: PARTY_REPOSITORY;

  constructor(private guestMapper: GuestMapper) {}

  async getGuestsByIds(guestIds: string[]): Promise<Guest[]> {
    const guests = await this.guestRepository.findBy({ id: In(guestIds) }).catch((error) => {
      throw new ResourceNotFoundException(error);
    });
    if (guests.length !== guestIds.length) {
      const foundIds = guests.map((guest) => guest.id);
      const notFoundIds = guestIds.filter((id) => foundIds.indexOf(id) < 0);
      throw new ResourceNotFoundException(`Could not find guests with ids: [${notFoundIds.join(", ")}]`);
    }

    return guests;
  }

  getGuest(id: string) {
    return this.guestRepository.findOneByOrFail({ id }).catch((error) => {
      throw new ResourceNotFoundException(error.message);
    });
  }

  async createGuest(guestDto: GuestDto) {
    const guest = this.guestMapper.toEntity(guestDto);
    guest.party = guestDto.partyId
      ? await this.partyRepository.findOneByOrFail({ id: guestDto.partyId }).catch(() => {
          throw new ResourceNotFoundException(`Party with given id: ${guestDto.partyId} not found`);
        })
      : undefined;

    const result = await this.guestRepository.create(guest);
    const savedGuest = await this.guestRepository.save(result);
    return savedGuest;
  }
}
