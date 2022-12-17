import { Service } from "@tsed/di";
import { UserService } from "../services/UserService";
import { RegisterInput } from "../models/dto/RegisterInput";

@Service()
export class AuthFacade {
  constructor(private userService: UserService) {}

  registerUser(registerInput: RegisterInput) {
    return this.userService.saveUser({ ...registerInput });
  }
}
