# iSolve Application

## Setting Environment Variables

## Running development environment

```shell
    $ npm run dev
```

### Installing dependencies

```shell
    $ npm install
```

### Running application

```shell
    $ npm run start
```

## Notes

Using Visual Studio Code (https://code.visualstudio.com/), please install the following extensions:

- Prettier - Code formatter
- Eslint
- vscode-styled-components: Styled components extension
- GitLens - Git supercharged (Recommended)
- Material Icon Theme (Recommended)
- Better Comments (Recommended)
- SonarLint (Recommended)

This application makes use of husky and pre-commit hooks. It will run tests and to lint check before allowing commits. You might need to run the following commands to give permissions:

```shell
chmod ug+x .husky/*
chmod ug+x .git/hooks/*
```
