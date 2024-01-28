
import { SPECIALS, askPasswordLength, askSpecialChars, generatePassword } from "./generatePassword.js";
import { expect, test, vi } from "vitest";
import { prompt } from "./prompt.js";
import { describe } from "vitest";


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

describe("given we ask password length", () => {

  const errorMessage = /^La longueur du mot de passe doit être comprise entre 8 et 36 caractères.$/

  test("when we fill invalid prompt with string, should return error message", () => {
    vi.mocked(prompt).mockReturnValue("abc");
    expect(() => askPasswordLength()).toThrowError(errorMessage);
  });

  test("when we fill invalid prompt with empty string, should return error message", () => {
    vi.mocked(prompt).mockReturnValue("");
    expect(() => askPasswordLength()).toThrowError(errorMessage);
  });

  test("when we fill invalid prompt with number greater than 36, should return error message", () => {
    vi.mocked(prompt).mockReturnValue(37);
    expect(() => askPasswordLength()).toThrowError(errorMessage);
  });

  test("when we fill invalid prompt with number lower than 8, should return error message", () => {
    vi.mocked(prompt).mockReturnValue(7);
    expect(() => askPasswordLength()).toThrowError(errorMessage);
  });
})

describe("given we ask specials characters for the password generation", () => {
  describe("when we fill invalid prompt", () => {

    const errorMessage = /^Veuillez répondre par "y" pour oui ou "n" pour non.$/

    test("with string oder than 'y' or 'n', should return error message", () => {
      vi.mocked(prompt).mockReturnValue("abc");
      expect(() => askSpecialChars()).toThrowError(errorMessage);
    });

    test("with empty string, should return error message", () => {
      vi.mocked(prompt).mockReturnValue("");
      expect(() => askSpecialChars()).toThrowError(errorMessage);
    });
  });

  describe("when we fill valid prompt", () => {
    test("with 'y', should return true", () => {
      vi.mocked(prompt).mockReturnValue("y");
      expect(askSpecialChars()).toBe(true);
    });

    test("with 'n', should return false", () => {
      vi.mocked(prompt).mockReturnValue("n");
      expect(askSpecialChars()).toBe(false);
    });
  });

});




