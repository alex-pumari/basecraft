export interface UseCaseDependencies<
  AuthenticatedUser extends object = object,
> {
  currentUser?: AuthenticatedUser | undefined;
}
