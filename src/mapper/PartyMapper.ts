import { Service } from "@tsed/di";
import { PartyDto } from "src/models/dto/PartyDto";
import { Party } from "src/models/entity/Party";

@Service()
export class PartyMapper {
  public toEntity(partyDto: PartyDto): Party {
    const { name, date } = partyDto;
    return {
      name,
      date,
      progress: 0,
      plannedBudget: 0,
      expenses: 0,
      tasks: 0
    };
  }
}
