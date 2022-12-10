import { Inject, Service } from "@tsed/di";
import { ResourceNotFoundException } from "../models/exception";
import { PARTY_REPOSITORY } from "../repositories/PartyRepository";
import { Party } from "../models/entity/Party";
import { ValidationException } from "../models/exception/ValidationException";

@Service()
export class PartyService {
  @Inject(PARTY_REPOSITORY)
  protected partyRepository: PARTY_REPOSITORY;

  async getParty(id: string) {
    const party = await this.partyRepository
      .getPartyById(id)
      .then((party) => {
        if (!party) throw { message: `Party with id ${id} not found` };
        return party;
      })
      .catch((error) => {
        throw new ResourceNotFoundException(error.message);
      });

    const guestData = await this.partyRepository.getGuestsData(id).then((guestData) => {
      if (!guestData) throw { message: `Party with id ${id} not found` };
      return guestData;
    });
    party.guestConfirmed = guestData.guestConfirmed;
    party.guestInvited = guestData.guestInvited;

    return party;
  }

  deleteParty(id: string) {
    return this.partyRepository.delete({ id }).catch((error) => {
      throw new ValidationException(error.message);
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

  getAllTasks(id: string) {
    return this.partyRepository
      .createQueryBuilder("party")
      .innerJoinAndSelect("party.tasks", "tasks")
      .where("party.id = :id", { id })
      .getOneOrFail()
      .then((party) => party.tasks ?? [])
      .catch((error) => {
        throw new ResourceNotFoundException(error.message);
      });
  }

  async saveParty(party: Party) {
    return await this.partyRepository.save(party);
  }
}
