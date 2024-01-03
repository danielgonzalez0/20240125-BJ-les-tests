# Module 9 - Tests unitaires

Ce repository est un exercice dans le cadre de la formation [BeginJavaScript](https://codelynx.dev/beginjavascript/courses).

Tu trouveras les solutions sur ma plateforme de formation.

Tu trouveras les instructions dans le fichier [Instructions](./INSTRUCTIONS.md).

Pour lancer le projet, suis les instructions ci-dessous.

## Télécharger les dépendances

Vérifie que tu possèdes les dépendances suivantes :

- [git](https://git-scm.com/downloads) - v2 ou plus
- [node](https://nodejs.org/en/) - v12 ou plus
- [npm](https://nodejs.org/en/) - v6 ou plus
- [VSCode](https://code.visualstudio.com/download) - 1.78.2 ou plus

Vérifie que tout est ok :

```bash
git --version
node --version
npm --version
```

## Cloner le projet

- Ouvrir un terminal

```bash
git clone https://github.com/Melvynx/beginjavascript-9.tests.git

cd beginjavascript-9.tests

npm install
```

## Lancer le projet

Le projet est le générateur de password qu'on a fait ensemble dans un précédent module.

Si tu veux tester le résultat final du projet, tu peux faire :

```bash
node index.js
```

Si tu souhaites lancer les "tests" pour les parties 1 à 2, tu peux faire :

```bash
node test.js
```

Pour la suite, on devra utiliser `vitest` pour lancer les tests.
