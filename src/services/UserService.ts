import { Inject, Service } from "@tsed/di";
import { USER_REPOSITORY } from "../repositories/UserRepository";
import { User } from "../models/entity/User";
import { ValidationException } from "../models/exception/ValidationException";
import { AuthInput } from "../models/dto/AuthInput";
import { hashPassword } from "../security/PassowrdUtils";
import { UserRoles } from "../models/enums/UserRoles";
import { ResourceNotFoundException } from "../models/exception";

@Service()
export class UserService {
  @Inject(USER_REPOSITORY)
  protected userRepository: USER_REPOSITORY;

  saveUser(user: User) {
    return this.userRepository.save(user).catch((error) => {
      throw new ValidationException(error.detail);
    });
  }

  getByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  getById(id: string) {
    return this.userRepository.findOneByOrFail({ id }).catch(() => {
      throw new ResourceNotFoundException(`User with id ${id} not found!`);
    });
  }

  async setupUserData(authInput: AuthInput): Promise<User> {
    const { email, password } = authInput;
    const passwordHash = await hashPassword(password);
    const user: User = {
      email: email,
      password: passwordHash,
      role: UserRoles.USER
    };
    return user;
  }
}
