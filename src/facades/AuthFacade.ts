import { Service } from "@tsed/di";
import { UserService } from "../services/UserService";
import { RegisterInput } from "../models/dto/RegisterInput";

@Service()
export class AuthFacade {
  constructor(private userService: UserService) {}

  async registerUser(registerInput: RegisterInput) {
    const user = await this.userService.setupUserData(registerInput);
    return this.userService.saveUser(user);
  }
}
