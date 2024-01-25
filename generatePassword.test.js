import { SPECIALS, generatePassword } from "./generatePassword.js";

const test = (name, fn) => {
  try {
    fn();
    console.log(`✅ Test ${name} passed`);
  } catch (error) {
    console.log(`❌ Test ${name} failed: ${error.message}`);
  }
}

const expect = (actual) => {
  const result = {
    toBe: (expected) => {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },
    toHabeLength: (expected) => {
      if (actual.length !== expected) {
        throw new Error(`${actual} length is not equal to ${expected}`);
      }
    },
  }

  return result;
}

test("password should have 8 charcaters", () => {

  const password = generatePassword(8, false, false, false);

  expect(password).toHabeLength(8);
})

test("password should contain special characters", () => {

  const passwordWithSpecial = generatePassword(8, true, false, false);

  const passwordHasSpecial = passwordWithSpecial.split("").some((char) => SPECIALS.includes(char));

  expect(passwordHasSpecial).toBe(true);

})

test("password should NOT contain special characters", () => {

  const passwordWithoutSpecial = generatePassword(8, false, false, false);

  const passwordHasSpecial = passwordWithoutSpecial.split("").some((char) => SPECIALS.includes(char));

  expect(passwordHasSpecial).toBe(false);
})

