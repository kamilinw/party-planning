import { Exception as TsEdException } from "@tsed/exceptions";
import { Default, Enum, Integer, Property } from "@tsed/schema";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ApiException } from "./ApiException";

class ExceptionResponse {
  @Integer()
  @Enum(StatusCodes)
  @Default(StatusCodes.IM_A_TEAPOT)
  public status: number;

  @Property()
  @Default("im_a_teapot")
  public code: string;

  @Property()
  @Default(ReasonPhrases.IM_A_TEAPOT)
  public message: string;

  constructor(status: number, code: string, message: string) {
    this.status = status;
    this.code = code;
    this.message = message;
  }

  public static fromApiException(exception: ApiException): ExceptionResponse {
    return new ExceptionResponse(exception.status, exception.code.toLowerCase(), exception.message);
  }

  public static fromTsEdException(exception: TsEdException): ExceptionResponse {
    return new ExceptionResponse(exception.status, exception.name.toLowerCase(), exception.message);
  }
}

export { ExceptionResponse };
