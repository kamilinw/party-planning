import { Controller } from "@tsed/di";
import { BodyParams } from "@tsed/platform-params";
import { Post, Returns } from "@tsed/schema";
import { User } from "../models/entity/User";
import { AuthFacade } from "../facades/AuthFacade";
import { AuthInput } from "../models/dto/AuthInput";
import { LoginResponse } from "../models/dto/LoginResponse";

@Controller("")
export class AuthController {
  constructor(private authFacade: AuthFacade) {}

  @Post("/register")
  @Returns(201, User)
  registerUser(@BodyParams() authInput: AuthInput): Promise<User> {
    return this.authFacade.registerUser(authInput);
  }

  @Post("/login")
  @Returns(200, LoginResponse)
  login(@BodyParams() authInput: AuthInput): Promise<LoginResponse> {
    return this.authFacade.login(authInput);
  }
}
