import { DomainError } from "../packages/basecraft-errors/src/error/domain.error";
import { createResult } from "./helpers/use-case/create-result";
import { ArraySchema } from "./schema/array-schema.type";
import { BooleanSchema } from "./schema/boolean-schema.type";
import { NumberSchema } from "./schema/number-schema.type";
import { ObjectSchema } from "./schema/object-schema.type";
import { Schema } from "./schema/schema.type";
import { StringSchema } from "./schema/string-schema.type";
import { BaseUser, UseCaseDependencies } from "./use-case/use-case-dependencies.type";
import { UseCaseOptions } from "./use-case/use-case-options.type";

export declare function number(): NumberSchema;

export declare function string(): StringSchema;

export declare function boolean(): BooleanSchema;

export declare function array<ItemType>(
  itemSchema: Schema<ItemType>
): ArraySchema<ItemType>;

export declare function object<ObjectType extends object>(
  shape: ObjectSchema<ObjectType>
): ObjectSchema<ObjectType>;

//----


// 1. Tipos de ejemplo para nuestro caso de uso
interface MockUser extends BaseUser {
  id: number;
  username: string;
  role: "admin" | "editor";
}

interface MockDependencies extends UseCaseDependencies<MockUser> {
  logger: { log: (msg: string) => void };
  email: { send: () => void };
}

interface MockRequest {
  title: string;
}

interface MockResponse {
  id: string;
}

// Supongamos que DomainError requiere 'message' y 'code'
class MockDomainError extends DomainError {
  code = "MOCK_DOMAIN"

  constructor(message: string) {
    super(message);
    this.name = "MockDomainError";
  }
}

// 3. Objeto Mock de UseCaseOptions
export const mockUseCaseOptions: UseCaseOptions<
  MockDependencies,
  MockRequest,
  MockResponse,
  MockDomainError
> = {
  authenticationRequired: true,
  
  allowedRoles: ["admin", "editor"],

  requestSchema: {
    title: array()
  },

  handler: async (dependencies, request) => {
    // Ejemplo de uso de las dependencias e inputs recibidos
    dependencies.logger.log(`Procesando post: ${request.title}`);

    if (!dependencies.currentUser) {
      return createResult.failure(new MockDomainError("Usuario no autenticado"));
    }

    return createResult.success({
      id: "post_123",
    });
  },
};