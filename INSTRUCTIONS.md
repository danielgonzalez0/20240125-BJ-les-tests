Bienvenue dans le cours sur les **tests** en JavaScript et ensemble, on va comprendre comment tester nos applications.

Dans ce projet, que tu as déjà réalisé, on va venir tester la fonction `generatePassword` afin de s'assurer qu'elle génère toujours le bon mot de passe.

Pour ça, on va venir comprendre comment fonctionnent les tests en "recréant" un outil pour tester.

Tu trouveras un fichier `generatePassword.test.js` dans lequel on va créer nos tests.

## Part 1 : Fonction `test`

Dans notre fichier, tu peux remarquer que c'est un peu le bazar. Il y a deux tests mais on ne comprend pas totalement ce qu'il se passe.

Ce serait intéressant d'avoir une fonction `test` qui prend deux paramètres :

1. Le nom du test, une chaîne de caractères qui décrit ce que le test fait
2. Une fonction qui va contenir le test

Cette fonction qui contient le test sera une fonction de rappel.

Dans notre fonction test, on va pouvoir exécuter cette fonction avec un try/catch et s'il y a une erreur, on va pouvoir l'attraper et afficher un message d'erreur.

S'il n'y a pas d'erreur, on va pouvoir afficher un message de succès avec le "nom du test" !

À toi de jouer.

## Part 2 : Fonction `expect`

Maintenant, les `if` avec le `throw` d'erreur, c'est quand même pas très propre. On va venir créer une fonction `expect` qui va prendre un paramètre :

- `actual` : la valeur actuelle à tester

Notre fonction va ensuite retourner un objet avec deux propriétés :

- `toBe` : une fonction qui va prendre un paramètre `expected` et qui va comparer `actual` et `expected` et s'ils sont différents, on va venir lancer une erreur avec un message d'erreur
- `toHaveLength` : une fonction qui va prendre un paramètre `expected` (qui sera un nombre) et qui va comparer la longueur de `actual` et `expected` et s'ils sont différents, on va venir lancer une erreur avec un message d'erreur

N'hésite pas à t'aider de Google et ChatGPT si tu ne vois pas comment faire, mais le but est de pouvoir utiliser tes fonctions de cette manière :

```js
test("8 characters password is generated", () => {
  const password = generatePassword(8, false, false, false);

  expect(password).toHaveLength(8);
});
```

Si le `password` n'a pas une longueur de 8, on va avoir une erreur qui va s'afficher.

## Part 3 : Utiliser `vitest`

Bon, on en a marre de tout faire soi-même, non ?

On va remplacer tout ça par vitest, un outil de test puissant qui fait exactement la même chose.

Pour ça, on va suivre [leur documentation](https://vitest.dev/guide/) :

1. Installer (je l'ai déjà fait pour toi)

```bash
npm install -D vitest
```

2. Modifier le script dans `package.json`

```json
"scripts": {
  "test": "vitest --exclude ./solutions",
}
```

PS : J'ai exclu les solutions pour que tu ne voies que le test que tu as.

Comme ça, en faisant `npm run test`, on va lancer vitest.

3. Remplacer les imports dans notre fichier `generatePassword.test.js`

```js
import { expect, test } from "vitest";
```

Et tu peux supprimer nos fonctions personnalisées.

4. Lancer `npm run test`

Normalement, tout devrait fonctionner et tu devrais voir les tests s'afficher.

## Part 4 : Mock de données

Finalement, j'aimerais bien tester `askPasswordLength` pour vérifier qu'elle gère bien les limites de 8 à 36 caractères.

Le problème, c'est que cette fonction appelle `prompt`, qui est une fonction qui va venir stopper l'exécution de notre code et attendre que l'utilisateur rentre une valeur.

Or, dans un test, on ne peut pas attendre que l'utilisateur rentre une valeur. On veut que tout soit automatique.

Pour ça, on va utiliser `vi.mock`, qui prend un chemin d'import en paramètre (ici `./prompt.js`) et qui retourne ce que tu veux.

En gros, ici on va venir "intercepter" l'appel à `prompt` et on va pouvoir lui retourner ce qu'on veut.

Le code ressemble à ceci :

```js
vi.mock("./prompt.js", () => ({
  prompt: vi.fn(() => "8"),
}));
```

Ici, `vi.mock` va venir intercepter l'import de `./prompt.js` et va retourner un objet avec une propriété `prompt`, qui est une fonction qui va retourner `8`.

`vi.fn` est une fonction qui nous permet de savoir combien de fois la fonction a été appelée et avec quels paramètres, mais surtout de modifier la valeur retournée.

Car il va falloir, au début de chaque test, utiliser [`vi.mocked`](https://vitest.dev/api/vi.html#vi-mocked) pour venir définir la valeur qu'on souhaite retourner.

En faisant un truc du genre :

```js
vi.mocked(prompt).mockReturnValue("8");
```

On vient modifier la valeur retournée par `prompt` pour que ce soit `8`.

Ce qui nous permet de créer notre premier test :

```js
test("ask password length with valid values", () => {
  vi.mocked(prompt).mockReturnValue("8");

  const result = askPasswordLength();

  expect(result).toBe(8);
});
```

À toi de tester tous les cas d'erreur pour notre `askPasswordLength` et pour `askSpecialChars`.

Dans la documentation, tu trouveras [toThrowError](https://vitest.dev/api/expect.html#tothrowerror), qui est un moyen de vérifier qu'une fonction throw une erreur, car c'est ce qu'on veut quand la valeur n'est pas valide.

À toi de jouer !
