import { UseAuth } from "@tsed/common";
import { useDecorators } from "@tsed/core";
import { Security } from "@tsed/schema";
import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";

interface AuthOptions extends Record<string, unknown> {
  roles?: string[];
}

const WithAuth = (options: AuthOptions = {}) => {
  return useDecorators(UseAuth(AuthenticationMiddleware, options), Security("Bearer"));
};

export { WithAuth };
