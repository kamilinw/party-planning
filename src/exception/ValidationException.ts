import { StatusCodes } from "http-status-codes";
import { ApiException } from "./ApiException";

class ValidationException extends ApiException {
  constructor(message: string) {
    super(StatusCodes.BAD_REQUEST, "bad_request", `${message}.`);
  }
}

export { ValidationException };
