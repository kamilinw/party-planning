import { Service } from "@tsed/di";
import { UserService } from "../services/UserService";
import { AuthInput } from "../models/dto/AuthInput";
import { LoginResponse } from "../models/dto/LoginResponse";
import { AuthenticationException } from "../models/exception/AuthenticationException";
import { isPasswordEqualToHash } from "../security/PassowrdUtils";
import { TokenService } from "../services/TokenService";

@Service()
export class AuthFacade {
  constructor(private userService: UserService, private tokenService: TokenService) {}

  async login(authInput: AuthInput) {
    const user = await this.userService.getByEmail(authInput.email);
    if (!user || !(await isPasswordEqualToHash(authInput.password, user.password))) {
      throw new AuthenticationException("Incorrect credentials");
    }

    const loginResponse: LoginResponse = {
      tokenType: "Bearer",
      token: this.tokenService.createJwtToken(user)
    };

    return loginResponse;
  }

  async registerUser(authInput: AuthInput) {
    const user = await this.userService.setupUserData(authInput);
    return this.userService.saveUser(user);
  }
}
