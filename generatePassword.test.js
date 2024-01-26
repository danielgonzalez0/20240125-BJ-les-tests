
import { SPECIALS, askPasswordLength, askSpecialChars, generatePassword } from "./generatePassword.js";
import { expect, test, vi } from "vitest";
import { prompt } from "./prompt.js";


test("password should have 8 charcaters", () => {

  const password = generatePassword(8, false, false, false);

  expect(password).toHaveLength(8);
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


//intercepter prompt
vi.mock("./prompt.js", () => ({
  prompt: vi.fn(() => "8"),
}));


test("ask password length with valid values", () => {
  vi.mocked(prompt).mockReturnValue("8");

  const result = askPasswordLength();

  expect(result).toBe(8);
});

test("ask password length with invalid values", () => {

  const errorMessage = /^La longueur du mot de passe doit être comprise entre 8 et 36 caractères.$/

  vi.mocked(prompt).mockReturnValue("abc");
  expect(() => askPasswordLength()).toThrowError(errorMessage);

  vi.mocked(prompt).mockReturnValue("7");
  expect(() => askPasswordLength()).toThrowError(errorMessage);

  vi.mocked(prompt).mockReturnValue("37");
  expect(() => askPasswordLength()).toThrowError(errorMessage);

  vi.mocked(prompt).mockReturnValue("");
  expect(() => askPasswordLength()).toThrowError(errorMessage);
});

test('ask specials characters with invalid answer', () => {

  const errorMessage = /^Veuillez répondre par "y" pour oui ou "n" pour non.$/

  vi.mocked(prompt).mockReturnValue("abc");
  expect(() => askSpecialChars()).toThrowError(errorMessage);

  vi.mocked(prompt).mockReturnValue("");

  expect(() => askSpecialChars()).toThrowError(errorMessage);
  vi.mocked(prompt).mockReturnValue(10);

});

test('ask specials characters with valid answer', () => {

  vi.mocked(prompt).mockReturnValue("y");
  expect(askSpecialChars()).toBe(true);

  vi.mocked(prompt).mockReturnValue("n");
  expect(askSpecialChars()).toBe(false);

});