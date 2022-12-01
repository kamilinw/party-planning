import { StatusCodes } from "http-status-codes";
import { ApiException } from "./ApiException";

class InternalServerErrorException extends ApiException {
  constructor() {
    super(StatusCodes.INTERNAL_SERVER_ERROR, "unexpected_error", `An unexpected error has occurred. Please contact the administrator.`);
  }
}

export { InternalServerErrorException };
