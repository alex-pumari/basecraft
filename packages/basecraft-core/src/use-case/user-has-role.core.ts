import { isNumber } from "../util/is-number.core.js";
import { isString } from "../util/is-string.core.js";

type UserWithRole<User extends object> = User & {
  role: string | number;
};

export function userHasRole<User extends object>(
  user: User,
): user is UserWithRole<User> {
  const userRole = (user as { role?: unknown }).role;

  return isString(userRole) || isNumber(userRole);
}
