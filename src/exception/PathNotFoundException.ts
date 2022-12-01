import { StatusCodes } from "http-status-codes";

import { ApiException } from "./ApiException";

class PathNotFoundException extends ApiException {
  constructor(method: string, path: string) {
    super(StatusCodes.NOT_FOUND, "not_found", `Can't find ${method.toUpperCase()} ${path} on this server.`);
  }
}

export { PathNotFoundException };
