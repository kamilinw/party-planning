import { Controller } from "@tsed/di";
import { BodyParams } from "@tsed/platform-params";
import { Post, Returns } from "@tsed/schema";
import { User } from "../models/entity/User";
import { AuthFacade } from "../facades/AuthFacade";
import { RegisterInput } from "../models/dto/RegisterInput";

@Controller("")
export class AuthController {
  constructor(private authFacade: AuthFacade) {}

  @Post("/register")
  @Returns(201, User)
  registerUser(@BodyParams() registerInput: RegisterInput): Promise<User> {
    return this.authFacade.registerUser(registerInput);
  }
}
