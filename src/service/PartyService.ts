import { Inject, Service } from "@tsed/di";
import { ResourceNotFoundException } from "../models/exception";
import { PartyDto } from "../models/dto/PartyDto";
import { PARTY_REPOSITORY } from "../repository/PartyRepository";

@Service()
export class PartyService {
  @Inject(PARTY_REPOSITORY)
  protected repository: PARTY_REPOSITORY;

  getParty(id: string) {
    return this.repository.findOneByOrFail({ id }).catch((error) => {
      throw new ResourceNotFoundException(error.message);
    });
  }

  async createParty(partyDto: PartyDto) {
    const progress = 0;
    const plannedBudget = 0;
    const expenses = 0;
    const tasks = 0;
    const result = await this.repository.create({ ...partyDto, progress, plannedBudget, expenses, tasks });
    const party = await this.repository.save(result);
    console.log("Party id: ", party.id);
    return party;
  }
}
