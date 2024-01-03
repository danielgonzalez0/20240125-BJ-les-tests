import { prompt } from './prompt.js';

export function askPasswordLength() {
  let length = Number(prompt('🔢 Combien de caractères ? (8-36)\n'));

  console.log({ length });

  if (length < 8 || length > 36 || Number.isNaN(length)) {
    throw new Error(
      'La longueur du mot de passe doit être comprise entre 8 et 36 caractères.'
    );
  }

  return length;
}

export function askSpecialChars() {
  let special = prompt('🔣 Caractères spéciaux ? (y/n)\n');

  if (special !== 'y' && special !== 'n') {
    throw new Error('Veuillez répondre par "y" pour oui ou "n" pour non.');
  }

  return special === 'y';
}

export function askNumbers() {
  let numbers = prompt('🔢 Chiffres ? (y/n)\n');

  if (numbers !== 'y' && numbers !== 'n') {
    throw new Error('Veuillez répondre par "y" pour oui ou "n" pour non.');
  }

  return numbers === 'y';
}

export function askUppercase() {
  let numbers = prompt('⬆️ Majuscules ? (y/n)\n');

  if (numbers !== 'y' && numbers !== 'n') {
    throw new Error('Veuillez répondre par "y" pour oui ou "n" pour non.');
  }

  return numbers === 'y';
}

export const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
export const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const SPECIALS = '!@#$%^&*()';
export const NUMBERS = '0123456789';

export function generatePassword(length, special, numbers, uppercase) {
  let charset = LOWERCASE;
  if (special) charset += SPECIALS;
  if (numbers) charset += NUMBERS;
  if (uppercase) charset += UPPERCASE;

  let password = '';
  // check if password contain 1 majuscule
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  if (uppercase && password.toLowerCase() === password) {
    return generatePassword(length, special, numbers, uppercase);
  }

  if (special && !password.match(/[!@#$%^&*()]/)) {
    return generatePassword(length, special, numbers, uppercase);
  }

  return password;
}
