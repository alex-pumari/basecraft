export abstract class DomainError<Code extends string = string> extends Error {
  abstract readonly code: Code;

  protected constructor(message: string) {
    super(message);

    this.name = new.target.name;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}