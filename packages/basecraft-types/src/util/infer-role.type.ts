import { UseCaseDependencies } from "../use-case/use-case-dependencies.type.js";
import { InferCurrentUser } from "./infer-current-user.type.js";

export type InferRole<Dependencies extends UseCaseDependencies> =
  InferCurrentUser<Dependencies> extends { role?: infer Role }
    ? [Extract<Role, string | number>] extends [never]
      ? string | number
      : Extract<Role, string | number>
    : string | number;
