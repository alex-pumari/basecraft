const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export function emailRule(value: string): boolean {
  return emailPattern.test(value);
}
