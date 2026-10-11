import { DomainError } from "../../packages/basecraft-errors/src/error/domain.error";
import { Result } from "./result.type";
import { UseCaseDependencies } from "./use-case-dependencies.type";
import { UseCaseError } from "./use-case-error.type";

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