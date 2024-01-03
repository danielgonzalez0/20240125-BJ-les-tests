import { SPECIALS, generatePassword } from './generatePassword.js';

// 🦁 Créer une function "test" qui prends deux arguments:
// - "name" qui est une string
// - "fn" qui est une function
// Ensuite tu vas execute la function "fn"
// - Si elle ne throw pas d'erreur, tu affiches "✅ Test ${name} passed"
// - Si elle throw une erreur, tu affiches "❌ Test ${name} failed: ${error.message}"

// 🦁 Wrap le code ci-dessous dans un appel de "test"
// Test that 8 characters password is generated
const password = generatePassword(8, false, false, false);

if (password.length !== 8) {
  throw new Error('Password should have 8 characters');
}

console.log('✅ Test 1 passed');

// 🦁 Wrap le code ci-dessous dans un appel de "test"
// Test that password contain at least 1 special character if asked
const passwordWithSpecial = generatePassword(8, true, false, false);

if (!passwordWithSpecial.split('').some((char) => SPECIALS.includes(char))) {
  throw new Error('Password should contain specials characters');
}

// 🦁 Wrap le code ci-dessous dans un appel de "test"
// Test that password does NOT contain special character if not asked
const passwordWithoutSpecial = generatePassword(8, false, false, false);

if (passwordWithoutSpecial.split('').some((char) => SPECIALS.includes(char))) {
  throw new Error('Password should NOT contain specials characters');
}

console.log('✅ Test 2 passed');
