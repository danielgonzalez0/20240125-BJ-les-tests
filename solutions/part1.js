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

// Tests
test('8 characters password is generated', () => {
  const password = generatePassword(8, false, false, false);

  if (password.length !== 8) {
    throw new Error('Password should have 8 characters');
  }
});

test('password contain at least 1 special character if asked', () => {
  const passwordWithSpecial = generatePassword(8, true, false, false);

  if (!passwordWithSpecial.split('').some((char) => SPECIALS.includes(char))) {
    throw new Error('Password should contain specials characters');
  }
});

test('password does NOT contain special character if not asked', () => {
  const passwordWithoutSpecial = generatePassword(8, false, false, false);

  if (passwordWithoutSpecial.split('').some((char) => SPECIALS.includes(char))) {
    throw new Error('Password should NOT contain specials characters');
  }
});
