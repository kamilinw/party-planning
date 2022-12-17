import { Inject, Service } from "@tsed/di";
import { USER_REPOSITORY } from "../repositories/UserRepository";
import { User } from "../models/entity/User";
import { ValidationException } from "../models/exception/ValidationException";

@Service()
export class UserService {
  @Inject(USER_REPOSITORY)
  protected userRepository: USER_REPOSITORY;

  saveUser(user: User) {
    return this.userRepository.save(user).catch((error) => {
      throw new ValidationException(error.detail);
    });
  }
}
