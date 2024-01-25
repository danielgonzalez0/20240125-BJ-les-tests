import {
  askNumbers,
  askPasswordLength,
  askSpecialChars,
  askUppercase,
  generatePassword,
} from './generatePassword.js';

function main() {
  let length = null;
  let special = null;
  let numbers = null;
  let uppercase = null;

  while (
    length === null ||
    special === null ||
    numbers === null ||
    uppercase === null
  ) {
    try {
      if (length === null) {
        length = askPasswordLength();
      }
      if (special === null) {
        special = askSpecialChars();
      }
      if (numbers === null) {
        numbers = askNumbers();
      }
      if (uppercase === null) {
        uppercase = askUppercase();
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const password = generatePassword(length, special, numbers, uppercase);

  console.log('Votre mot de passe généré est le suivant:', password);
}

main();
