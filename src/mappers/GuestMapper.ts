import { Service } from "@tsed/di";
import { GuestDto } from "src/models/dto/GuestDto";
import { Guest } from "src/models/entity/Guest";

@Service()
export class GuestMapper {
  public toEntity(guestDto: GuestDto): Guest {
    return {
      ...guestDto
    };
  }
}
