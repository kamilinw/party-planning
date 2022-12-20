import { Service } from "@tsed/di";
import { JwtToken } from "../models/common/JwtToken";
import { AuthenticationException } from "../models/exception/AuthenticationException";
import { User } from "../models/entity/User";
import { UserRoles } from "../models/enums/UserRoles";
import jwt from "jsonwebtoken";
import { instanceToPlain } from "class-transformer";

@Service()
export class TokenService {
  createJwtToken(user: User) {
    const { id, role } = user;
    if (!id || !role) {
      throw new AuthenticationException("Incorrect credentials");
    }
    const token = new JwtToken(id, role as UserRoles);

    return jwt.sign(instanceToPlain(token), process.env.JWT_SECRET || "jwtSecret", {
      expiresIn: parseInt(process.env.JWT_EXPIRATION_TIME ?? "3600")
    });
  }
}
