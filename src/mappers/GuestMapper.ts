import { Service } from "@tsed/di";
import { GuestDto } from "src/models/dto/GuestDto";
import { Guest } from "src/models/entity/Guest";

@Service()
export class GuestMapper {
  public toEntity(guestDto: GuestDto): Guest {
    return {
      firstName: guestDto.firstName,
      lastName: guestDto.lastName,
      age: guestDto.age,
      plusOne: guestDto.plusOne,
      confirmed: false
    };
  }
}
