import { Inject, Service } from "@tsed/di";
import { USER_REPOSITORY } from "../repositories/UserRepository";
import { User } from "../models/entity/User";
import { ValidationException } from "../models/exception/ValidationException";
import { RegisterInput } from "../models/dto/RegisterInput";
import { hashPassword } from "../security/PassowrdUtils";
import { UserRoles } from "../models/enums/UserRoles";

@Service()
export class UserService {
  @Inject(USER_REPOSITORY)
  protected userRepository: USER_REPOSITORY;

  saveUser(user: User) {
    return this.userRepository.save(user).catch((error) => {
      throw new ValidationException(error.detail);
    });
  }

  async setupUserData(registerInput: RegisterInput): Promise<User> {
    const { email, password } = registerInput;
    const passwordHash = await hashPassword(password);
    const user: User = new User();
    user.email = email;
    user.password = passwordHash;
    user.role = UserRoles.USER;
    return user;
  }
}
