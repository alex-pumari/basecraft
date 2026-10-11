import { DomainError } from "../../packages/basecraft-errors/src/error/domain.error";
import { ObjectSchema } from "../schema/object-schema.type";
import { Result } from "./result.type";
import { UseCaseDependencies } from "./use-case-dependencies.type";

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
