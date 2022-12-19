import { Service } from "@tsed/di";
import { User } from "../models/entity/User";

@Service()
export class TokenService {
  createJwtToken(user: User) {
    return `Creating tokens not implemented. User: ${user.email}`;
  }
}
