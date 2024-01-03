import { SPECIALS, generatePassword } from "./generatePassword.js";

// 🦁 Créer une fonction "test" qui prend deux arguments :
// - "name" qui est une string
// - "fn" qui est une fonction
// Ensuite, tu vas exécuter la fonction "fn"
// - Si elle ne lance pas d'erreur, tu affiches "✅ Test ${name} passed"
// - Si elle lance une erreur, tu affiches "❌ Test ${name} failed: ${error.message}"

// 🦁 Wrap le code ci-dessous dans un appel de "test"
// Teste si un mot de passe de 8 caractères est généré
const password = generatePassword(8, false, false, false);

if (password.length !== 8) {
  throw new Error("Password should have 8 characters");
}

console.log("✅ Test 1 passed");

// 🦁 Wrap le code ci-dessous dans un appel de "test"
// Teste si le mot de passe contient au moins 1 caractère spécial si demandé
const passwordWithSpecial = generatePassword(8, true, false, false);

if (!passwordWithSpecial.split("").some((char) => SPECIALS.includes(char))) {
  throw new Error("Password should contain special characters");
}

// 🦁 Wrap le code ci-dessous dans un appel de "test"
// Teste si le mot de passe ne contient PAS de caractère spécial si non demandé
const passwordWithoutSpecial = generatePassword(8, false, false, false);

if (passwordWithoutSpecial.split("").some((char) => SPECIALS.includes(char))) {
  throw new Error("Password should NOT contain special characters");
}

console.log("✅ Test 2 passed");
