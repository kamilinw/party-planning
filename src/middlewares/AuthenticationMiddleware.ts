import { Context, Middleware, MiddlewareMethods, Req, Res } from "@tsed/common";
import { UserRoles } from "../models/enums/UserRoles";
import { ForbiddenException } from "../models/exception/ForbiddenException";
import { TokenService } from "../services/TokenService";

const USER_ID_KEY = process.env.USER_ID_KEY ?? "user_id";

@Middleware()
class AuthenticationMiddleware implements MiddlewareMethods {
  constructor(private tokenService: TokenService) {}

  use(@Req() request: Req, @Res() _response: Res, @Context() context: Context) {
    console.log("here 0");
    const tokenString = this.tokenService.extractTokenFromRequest(request);
    const jwtToken = this.tokenService.parseToken(tokenString);
    const { role, sub } = jwtToken;
    console.log("here 1");
    this.ensureUserHasPrivileges(role, context);
    console.log("here 2");
    this.attachUserIdToContext(sub, context);
  }

  private ensureUserHasPrivileges(role: UserRoles, context: Context) {
    const { roles: allowedRoles } = context.endpoint.get(AuthenticationMiddleware) || {};

    const userHasPrivileges = allowedRoles.length === 0 || allowedRoles.some((allowedRole: UserRoles) => allowedRole === role);

    if (!userHasPrivileges) {
      throw new ForbiddenException("Access forbiden");
    }
  }

  private attachUserIdToContext(id: string, context: Context) {
    context.set(USER_ID_KEY, id);
  }
}
export { AuthenticationMiddleware };
