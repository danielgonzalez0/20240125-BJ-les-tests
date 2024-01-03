import { SPECIALS, generatePassword } from '../generatePassword.js';

// Tests helpers
const test = (name, fn) => {
  try {
    fn();
    console.log(`✅ Test ${name} passed`);
  } catch (error) {
    console.error(`❌ Test ${name} failed: ${error.message}`);
  }
};

const matchers = (actual) => ({
  toBe: (expected) => {
    if (actual !== expected) {
      throw new Error(`Expected ${actual} to be ${expected}`);
    }
  },
  toHaveLength: (expected) => {
    if (actual.length !== expected) {
      throw new Error(
        `Expected ${actual} to have length ${expected} (got: ${actual.length})`
      );
    }
  },
});

const expect = (actual) => {
  const actualMatchers = matchers(actual);

  return {
    ...actualMatchers,
  };
};

// Tests
test('8 characters password is generated', () => {
  const password = generatePassword(8, false, false, false);

  expect(password).toHaveLength(8);
});

test('password contain at least 1 special character if asked', () => {
  const passwordWithSpecial = generatePassword(8, true, false, false);

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
