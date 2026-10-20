import { DomainError } from "@basecraft/errors";
import { Result } from "./result.type.js";
import { UseCaseDependencies } from "./use-case-dependencies.type.js";
import { UseCaseError } from "./use-case-error.type.js";

export interface UseCase<
  Dependencies extends UseCaseDependencies,
  Request extends object,
  Response,
  CustomError extends DomainError,
> {
  execute(
    dependencies: Dependencies,
    request: Request,
  ): Promise<Result<Response, UseCaseError<CustomError>>>;
}