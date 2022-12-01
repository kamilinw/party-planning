/* eslint-disable @typescript-eslint/no-unused-vars */
import { Err, Middleware, MiddlewareMethods, Next, Req, Res } from "@tsed/common";
import { Exception as TsEdException } from "@tsed/exceptions";

import { ApiException, ExceptionResponse, ResourceNotFoundException } from "../models/exception";
import { InternalServerErrorException } from "../models/exception/InternalServerErrorException";

@Middleware()
class ErrorHandlerMiddleware implements MiddlewareMethods {
  public use(@Err() error: Error, @Req() _request: Req, @Res() response: Res, @Next() _next: Next): void {
    return this.getExceptionHandler(error)(response, error);
  }

  private getExceptionHandler = (exception: Error): ((response: Res, error: Error) => void) => {
    const defaultHandler = (response: Res, error: Error): void => {
      if (error instanceof ApiException) {
        response.status(error.status).send(ExceptionResponse.fromApiException(error));
      } else if (error instanceof TsEdException) {
        response.status(error.status).send(ExceptionResponse.fromTsEdException(error));
      } else {
        const internalServerErrorException = new InternalServerErrorException();
        response.status(internalServerErrorException.status).send(ExceptionResponse.fromApiException(internalServerErrorException));
      }
    };

    const exceptionHandlers: { [exception: string]: (response: Res, error: Error) => void } = {
      DefaultException: defaultHandler
    };

    return exceptionHandlers[exception.name || exception.constructor.name] || exceptionHandlers.DefaultException;
  };
}

export { ErrorHandlerMiddleware };
