import { expect, test } from 'vitest';
import { SPECIALS, generatePassword } from '../generatePassword.js';

// Tests
test('8 characters password is generated', () => {
  const password = generatePassword(8, false, false, false);

  expect(password).toHaveLength(8);
});

test('password contain at least 1 special character if asked', () => {
  const passwordWithSpecial = generatePassword(8, true, false, false);

  console.log({ passwordWithSpecial });
  expect(passwordWithSpecial.split('').some((char) => SPECIALS.includes(char))).toBe(
    true
  );
});

test('password does NOT contain special character if not asked', () => {
  const passwordWithoutSpecial = generatePassword(8, false, false, false);

  expect(
    passwordWithoutSpecial.split('').some((char) => SPECIALS.includes(char))
  ).toBe(false);
});
