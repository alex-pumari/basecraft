import { DomainError } from "@basecraft/errors";
import { Shape } from "../schema/shape.type.js";
import { Result } from "./result.type.js";
import { InferRole } from "../util/infer-role.type.js";
import { UseCaseDependencies } from "./use-case-dependencies.type.js";

export interface UseCaseOptions<
  Dependencies extends UseCaseDependencies,
  Request extends object,
  Response,
  CustomError extends DomainError = never,
> {
  authRequired?: boolean | undefined;

  allowedRoles?: readonly InferRole<Dependencies>[] | undefined;

  requestShape: Shape<Request>;

  handler: (
    dependencies: Dependencies,
    request: Request,
  ) => Promise<Result<Response, CustomError>>;
}
