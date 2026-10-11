import { DomainError } from "basecraft-errors";
import { ObjectSchema } from "../schema/object-schema.type.js";
import { Result } from "./result.type.js";
import { UseCaseDependencies } from "./use-case-dependencies.type.js";

export interface UseCaseOptions<
  Dependencies extends UseCaseDependencies,
  Request extends object,
  Response,
  CustomError extends DomainError,
> {
  authenticationRequired: boolean;

  allowedRoles?: readonly string[] | undefined;

  requestSchema: ObjectSchema<Request>;

  handler: (
    dependencies: Dependencies,
    request: Request,
  ) => Promise<Result<Response, CustomError>>;
}
