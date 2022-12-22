import { Service } from "@tsed/di";
import { AuthenticationException } from "../models/exception/AuthenticationException";
import { User } from "../models/entity/User";
import { UserRoles } from "../models/enums/UserRoles";
import jwt from "jsonwebtoken";
import { JwtToken } from "../models/common/JwtToken";
import { ForbiddenException } from "../models/exception/ForbiddenException";
import { Req } from "@tsed/common";

@Service()
export class TokenService {
  createJwtToken(user: User) {
    const { id, role } = user;
    if (!id || !role) {
      throw new AuthenticationException("Incorrect credentials");
    }

    return jwt.sign(
      {
        sub: id,
        role: role as UserRoles
      },
      process.env.JWT_SECRET || "jwtSecret",
      {
        expiresIn: parseInt(process.env.JWT_EXPIRATION_TIME ?? "3600")
      }
    );
  }

  parseToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || "jwtSecret") as JwtToken;
    } catch (error) {
      console.log("Error when parsing access token: ", error.message);
      throw new ForbiddenException("Access forbiden");
    }
  }

  extractTokenFromRequest(request: Req) {
    const authAccessTokenHeader = request.get("Authorization");
    if (!authAccessTokenHeader) {
      throw new ForbiddenException("Access forbiden");
    }
    return authAccessTokenHeader.replace("Bearer ", "");
  }
}
