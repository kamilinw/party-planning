import { ValidationPipe } from "@tsed/platform-params";
import { JsonParameterStore, PipeMethods } from "@tsed/schema";
import { OverrideProvider } from "@tsed/di";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "../exception/ValidationException";

@OverrideProvider(ValidationPipe)
export class ClassValidationPipe extends ValidationPipe implements PipeMethods<any> {
  async transform(value: any, metadata: JsonParameterStore) {
    if (!this.shouldValidate(metadata)) {
      // there is no type and collectionType
      return value;
    }

    const object = plainToInstance(metadata.type, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      console.log(errors);
      const errorsString = errors
        .map((error) => Object.values(error.constraints ? error.constraints : {}))
        .map((errorArray) => errorArray.join("; "))
        .join("; ");

      throw new ValidationException(errorsString);
    }

    return value;
  }

  protected shouldValidate(metadata: JsonParameterStore): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];

    return !(metadata.type || metadata.collectionType) || !types.includes(metadata.type);
  }
}
