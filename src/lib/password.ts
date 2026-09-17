// Password policy.
//
// The rule and the sentence describing it live together so they cannot drift:
// if the check changes, the copy shown to the user changes with it. Two screens
// use this — Password (change a known one) and Reset password (recovery).

export interface PasswordRule {
  label: string;
  test: (password: string) => boolean;
}

export const PASSWORD_RULES: PasswordRule[] = [
  { label: "Eight characters or more", test: (password) => password.length >= 8 },
  {
    label: "One number and one symbol",
    test: (password) => /\d/.test(password) && /[^A-Za-z0-9]/.test(password),
  },
  {
    // Not checkable on the client — it needs a breach corpus server-side. It is
    // listed because the advice matters, and it never blocks submission.
    label: "Not a password you use elsewhere",
    test: () => true,
  },
];

/** Which rules the given password currently satisfies, in declaration order. */
export function checkPassword(password: string): boolean[] {
  return PASSWORD_RULES.map((rule) => rule.test(password));
}

export function isStrongEnough(password: string): boolean {
  return password.length > 0 && PASSWORD_RULES.every((rule) => rule.test(password));
}
