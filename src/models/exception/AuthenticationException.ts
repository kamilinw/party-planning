import { StatusCodes } from "http-status-codes";
import { ApiException } from "./ApiException";

class AuthenticationException extends ApiException {
  constructor(message: string) {
    super(StatusCodes.UNAUTHORIZED, "unauthorized", `${message}.`);
  }
}

export { AuthenticationException };
