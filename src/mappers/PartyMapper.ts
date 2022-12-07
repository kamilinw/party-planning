import { Service } from "@tsed/di";
import { PartyDto } from "src/models/dto/PartyDto";
import { Party } from "src/models/entity/Party";

@Service()
export class PartyMapper {
  public toEntity(partyDto: PartyDto): Party {
    return {
      ...partyDto
    };
  }
}
