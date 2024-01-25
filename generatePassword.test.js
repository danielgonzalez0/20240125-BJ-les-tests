import { SPECIALS, generatePassword } from "./generatePassword.js";

// 🦁 Créer une fonction "test" qui prend deux arguments :
// - "name" qui est une string
// - "fn" qui est une fonction
// Ensuite, tu vas exécuter la fonction "fn"
// - Si elle ne lance pas d'erreur, tu affiches "✅ Test ${name} passed"
// - Si elle lance une erreur, tu affiches "❌ Test ${name} failed: ${error.message}"

function test(name,fn){
  try{
    fn();
    console.log(`✅ Test ${name} passed`);
  }catch(error){
    console.log(`❌ Test ${name} failed: ${error.message}`);
  }
}

test("password should have 8 charcaters", ()=>{
  const password = generatePassword(8, false, false, false);
  if(password.length !== 8){
    throw new Error("Password should have 8 characters");
  }
})

test("password should contain special characters", ()=>{
  const passwordWithSpecial = generatePassword(8, true, false, false);
  if(!passwordWithSpecial.split("").some((char)=> SPECIALS.includes(char))){
    throw new Error("Password should contain special characters");
  }
})

test("password should NOT contain special characters", ()=>{

  const passwordWithoutSpecial = generatePassword(8, false, false, false);

  if (passwordWithoutSpecial.split("").some((char) => SPECIALS.includes(char))) {
    throw new Error("Password should NOT contain special characters");
  }
})

