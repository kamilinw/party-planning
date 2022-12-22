import { StatusCodes } from "http-status-codes";
import { ApiException } from "./ApiException";

class ForbiddenException extends ApiException {
  constructor(message: string) {
    super(StatusCodes.FORBIDDEN, "forbidden", `${message}.`);
  }
}

export { ForbiddenException };
