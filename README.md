# ReactJS frontend template

This project is meant to be a launch point for teams who needed a frontend UI and wish to use React. The desire is that you, a developer, can fork this repo and begin adding your own content and not have to worry about how to integrate P1 SSO or any of the initial foundation work, such as adding network requests, state management, or jest tests.

## VSCode Extension recomendations
* Babel JavaScript
* ES7 React/Redux/GraphQL
* ESLint
* GitLens -- Git superchaged
* Jest
* LintLens

## VSCode preferences recomendations
```json
{
    ...
    "editor.codeActionsOnSave": {
        "source.organizeImports": true,
    },
    "eslint.codeAction.showDocumentation": {
        "enable": true
    },
    "eslint.packageManager": "yarn",
    "jest.showCoverageOnLoad": true,
    "jest.pathToJest": "npm test -- --coverage"
}
```

## Getting started locally

0. Have a backend server running locally (add link to backend template projects)

**NOTE:** All commands should be executed from the root of the project unless otherwise stated.

### Developing
1. Install [yarn](https://classic.yarnpkg.com/en/docs/install)
2. Clone this repo.
3. Execute, `yarn install`
4. Execute, `yarn start:local`
5. In web browser navigate to, `http://localhost:3000` and see your sweet sweet app!
