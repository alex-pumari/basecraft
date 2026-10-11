export interface BaseUser {
  role: string;
}

export interface UseCaseDependencies<AuthenticatedUser extends BaseUser = BaseUser> {
  currentUser?: AuthenticatedUser | undefined;
}