import { Inject, Service } from "@tsed/di";
import { PartyDto } from "../models/dto/PartyDto";
import { PARTY_REPOSITORY } from "../repository/PartyRepository";

@Service()
export class PartyService {
  @Inject(PARTY_REPOSITORY)
  protected repository: PARTY_REPOSITORY;

  async getParty(id: number) {
    const party = await this.repository.createQueryBuilder().where("id = :id", { id });
    return party;
  }

  async createParty(partyDto: PartyDto) {
    return await this.repository.save({ ...partyDto });
  }
}
