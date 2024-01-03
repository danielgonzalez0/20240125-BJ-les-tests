Bienvenue dans le cours sur les **tests** en JavaScript et ensemble, on va comprendre comment tester nos applications.

Dans ce projet, que tu as déjà réalisé, on va venir tester la function `generatePassword` afin de s'assurer quel génère toujours le bon password.

Pour ça, on vas venir comprendre comment fonctionne les tests en "recréant" un outil pour tester.

Tu trouveras un fichier `test.js` dans lequel on va créer nos tests.

## Part 1 : Function `test`

Dans notre fichier, tu peux remarquer que c'est un peu le bordel. Il y a deux testes mais on ne comprends pas totalement ce qu'il se passe.

Ce serait intéressant d'avoir une function `test` qui prends deux paramètres :

1. Le nom du test, une string qui décrit ce que le test fait
2. Une function qui va contenir le test

Cette function qui contient le test sera une callback function.

Dans notre function test, on va pouvoir executé cette function avec un try/catch et si il y a une erreur, on va pouvoir l'attraper et afficher un message d'erreur.

Si il n'y a pas d'erreur, on va pouvoir afficher un message de succès avec le "nom du test" !

À toi de jouer.

## Part 2 : Function `expect`

Maintenant les `if` avec le `throw` d'erreur c'est quand même pas très propre. On va venir créer une function `expect` qui va prendre un paramètre :

- `actual` : la valeur actuelle à testé

Notre function va ensuite retourné un objet avec deux propriétés :

- `toBe` : une function qui va prendre un paramètre `expected` et qui va comparer `actual` et `expected` et si ils sont différents, on va venir throw une erreur avec un message d'erreur
- `toHaveLength` : une function qui va prendre un paramètre `expected` (qui sera un nombre) et qui va comparer la longueur de `actual` et `expected` et si ils sont différents, on va venir throw une erreur avec un message d'erreur

Hésites pas à t'aider de Google et ChatGPT si tu ne vois pas comment faire, mais le but est de pouvoir utiliser tes functions de cette manière :

```js
test('8 characters password is generated', () => {
  const password = generatePassword(8, false, false, false);

  expect(password).toHaveLength(8);
});
```

Si le `password` n'a pas une longueur de 8, on va avoir une erreur qui va s'afficher.

## Part 3 : Utiliser `vitest`

Bon y'en as marre de tous faire soit même non ?

On va remplacer tout ça pour vitest, un outil de test puissant qui fait exactement la même chose.

Pour ça, on va suivre [leur documentation](https://vitest.dev/guide/) :

1. Installer (je l'ai déjà fais pour toi)

```bash
npm install -D vitest
```

2. Modifier le script dans `package.json`

```json
"scripts": {
  "test": "vitest --exclude ./solutions",
}
```

PS : J'ai exclus les solutions pour que tu ne vois que le test que tu as

Comme ça, en faisant `npm run test` on va lancer vitest.

3. Remplacer les imports dans notre fichier `test.js`

```js
import { expect, test } from 'vitest';
```

Et tu peux supprimer nos customs function

4. Renommer `test.js` en `generatePassword.test.js`

Souvent on aime bien donner le nom du fichier qu'on test, suivi de `.test.js` pour savoir que c'est un fichier de test.

C'est aussi cette extensions `test.js` qui va permettre à vitest de savoir qu'il doit lancer ce fichier.

5. Lancer `npm run test`

Normalement, tout deverait fonctionner et tu devrais voir les tests s'afficher.

## Part 4 : Mock de données

Finalement j'aimerais bien tester `askPasswordLength` pour vérifier que elle gères bien les limites de 8 à 36 caractères.

Le problème c'est que cette function appel `prompt` qui est une function qui va venir stopper l'execution de notre code et attendre que l'utilisateur rentre une valeur.

Or, dans un test, on ne peut pas attendre que l'utilisateur rentre une valeur. On veut que tout soit automatiqe.

Pour ça on va utiliser `vi.mock` qui prends un chemin d'import en paramètre (ici `./prompt.js`) et qui retourne ce que tu veux.

En gros ici on va venir "intercepter" l'appel à `prompt` et on va pouvoir lui retourner ce qu'on veut.

Le code ressemble à ceci :

```js
vi.mock('./prompt.js', () => ({
  prompt: vi.fn(() => '8'),
}));
```

Ici `vi.mock` va venir intercepter l'import de `./prompt.js` et va retourner un object avec une propriété `prompt` qui est une function qui va retourner `8`.

`vi.fn` est une function qui nous permet de savoir combien de fois la function a été appelé et avec quels paramètres mais surtout de modifier la valeur retourné.

Car il va falloir au début de chaque test utiliser [`vi.mocked`](https://vitest.dev/api/vi.html#vi-mocked) pour venir définir la valeur qu'on souhaites retourné.

En faisant un truc du genre :

```js
vi.mocked(prompt).mockReturnValue('8');
```

On viens modifié la valeur retourné par `prompt` pour que ce soit `8`.

Ce qui nous permet de créer notre premier test :

```js
test('ask password length with valid values', () => {
  vi.mocked(prompt).mockReturnValue('8');

  const result = askPasswordLength();

  expect(result).toBe(8);
});
```

À toi de tester tous les cas d'erreur pour notre `askPasswordLength` et pour `askSpecialChars`.

Dans la documentation, tu trouveras [toThrowError](https://vitest.dev/api/expect.html#tothrowerror) qui est moyen de vérifier qu'une function throw une erreur, car c'est ce qu'on veut quand la valeur n'est pas valide.

À toi de jouer !
