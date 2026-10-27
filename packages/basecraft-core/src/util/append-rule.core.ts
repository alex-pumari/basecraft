export function appendRule<Rule>(
  rules: readonly Rule[],
  rule: Rule,
): readonly Rule[] {
  return [...rules, rule];
}
