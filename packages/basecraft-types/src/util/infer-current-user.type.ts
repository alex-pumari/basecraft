import { UseCaseDependencies } from "../use-case/use-case-dependencies.type.js";

export type InferCurrentUser<Dependencies extends UseCaseDependencies> = NonNullable<
  Dependencies["currentUser"]
>;
