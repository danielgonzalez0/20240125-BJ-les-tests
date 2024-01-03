import { expect, test, vi } from 'vitest';
import {
  SPECIALS,
  askPasswordLength,
  askSpecialChars,
  generatePassword,
} from '../generatePassword.js';
import { prompt } from '../prompt.js';

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

// ℹ️ Dans ton code, ce sera ./prompt.js car tu es pas dans un sous-dossier
vi.mock('../prompt.js', () => ({
  prompt: vi.fn(() => '8'),
}));

test('ask password length with valid values', () => {
  vi.mocked(prompt).mockReturnValue('8');

  const result = askPasswordLength();

  expect(result).toBe(8);
});

test('ask password length with a too big value should throw an error', () => {
  vi.mocked(prompt).mockReturnValue('40');

  expect(() => askPasswordLength()).toThrow(
    'La longueur du mot de passe doit être comprise entre 8 et 36 caractères.'
  );
});

test('ask password length with a too small value should throw an error', () => {
  vi.mocked(prompt).mockReturnValue('2');

  expect(() => askPasswordLength()).toThrow(
    'La longueur du mot de passe doit être comprise entre 8 et 36 caractères.'
  );
});

test('ask specials characters with a valid value should return true', () => {
  vi.mocked(prompt).mockReturnValue('y');

  const result = askSpecialChars();

  expect(result).toBe(true);
});

test('ask specials characters with a valid value should return false', () => {
  vi.mocked(prompt).mockReturnValue('n');

  const result = askSpecialChars();

  expect(result).toBe(false);
});

test('ask specials characters with an invalid value should throw an error', () => {
  vi.mocked(prompt).mockReturnValue('z');

  expect(() => askSpecialChars()).toThrow(
    'Veuillez répondre par "y" pour oui ou "n" pour non.'
  );
});
