import { Inject, Service } from "@tsed/di";
import { ResourceNotFoundException } from "../models/exception";
import { GUEST_REPOSITORY } from "../repositories/GuestRepository";
import { PARTY_REPOSITORY } from "../repositories/PartyRepository";
import { Guest } from "src/models/entity/Guest";
import { In } from "typeorm";
import { ValidationException } from "../models/exception/ValidationException";
import { GuestUpdate } from "src/models/dto/GuestUpdate";

@Service()
export class GuestService {
  @Inject(GUEST_REPOSITORY)
  protected guestRepository: GUEST_REPOSITORY;

  @Inject(PARTY_REPOSITORY)
  protected partyRepository: PARTY_REPOSITORY;

  async getGuestsByIds(guestIds: string[]): Promise<Guest[]> {
    const guests = await this.guestRepository.findBy({ id: In(guestIds) }).catch((error) => {
      throw new ResourceNotFoundException(error);
    });
    return guests;
  }

  getGuest(id: string) {
    return this.guestRepository.findOneByOrFail({ id }).catch((error) => {
      throw new ResourceNotFoundException(error.message);
    });
  }

  deleteGuest(id: string) {
    return this.guestRepository.delete({ id }).catch((error) => {
      throw new ValidationException(error.message);
    });
  }

  updateGuest(id: string, guestUpdate: GuestUpdate) {
    return this.guestRepository.update({ id }, guestUpdate).catch((error) => {
      throw new ResourceNotFoundException(error.message);
    });
  }

  getGuestCountWithPartyId(id: string) {
    return this.guestRepository
      .createQueryBuilder("guest")
      .where("guest.partyId = :id", { id })
      .getCount()
      .catch((error) => {
        throw new ResourceNotFoundException(error.message);
      });
  }

  async saveGuest(guest: Guest) {
    return await this.guestRepository.save(guest);
  }
}
