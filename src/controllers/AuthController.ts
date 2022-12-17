import { Controller } from "@tsed/di";
import { BodyParams } from "@tsed/platform-params";
import { Post } from "@tsed/schema";
import { AuthFacade } from "../facades/AuthFacade";
import { RegisterInput } from "../models/dto/RegisterInput";

@Controller("")
export class AuthController {
  constructor(private authFacade: AuthFacade) {}

  @Post("/register")
  registerUser(@BodyParams() registerInput: RegisterInput) {
    return this.authFacade.registerUser(registerInput);
  }
}
