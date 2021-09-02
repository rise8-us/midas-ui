# Mixer UI

This project is a ReactJS SPA that focuses on being a dashboard to see, through a single lens, all the apps within the ABMS Apps portfolio. It aggregates data from Jira & Gitlab then presents it in a bitesize view to empower portfolio and product managers to make decisions based on relevant data.

## VSCode Extension recomendations
* Babel JavaScript
* ES7 React/Redux/GraphQL
* ESLint
* GitLens -- Git superchaged
* Jest
* LintLens
* Live Share
* npm
* npm Intellisense
* SonarLint
* vscode-icons

## VSCode preferences recomendations
```json
{
    ...
    "editor.renderControlCharacters": true,
    "editor.renderWhitespace": "all",
    "explorer.confirmDelete": false,
    "workbench.iconTheme": "vscode-icons",
    "editor.codeActionsOnSave": {
        "source.fixAll": false,
        "source.organizeImports": true,
    },
    "eslint.codeAction.showDocumentation": {
        "enable": true
    },
    "eslint.packageManager": "yarn",
    "jest.showCoverageOnLoad": true,
    "jest.jestCommandLine": "react-scripts test --coverage",
    "explorer.confirmDragAndDrop": false,
    "editor.minimap.enabled": false,
    "vsicons.dontShowNewVersionMessage": true,
    "prettier.printWidth": 120,
    "prettier.semi": false,
    "prettier.singleQuote": true,
    "prettier.trailingComma": "none",
    "git.enableSmartCommit": true,
    "sonarlint.rules": {
    },

}
```

## Getting started locally

> Have the [Midas-API project](https://code.il2.dso.mil/abms/products/rise8/midas/midas-api) running locally.

**NOTE:** All commands should be executed from the root of the project unless otherwise stated.

### Developing
1. Install [yarn](https://classic.yarnpkg.com/en/docs/install)
2. Clone this repo.
3. Execute, `yarn install`
4. Execute, `yarn start:local`
5. In a chrome browser navigate to, `http://localhost:3000` and see your sweet, sweet app!

### Running Docker
1. Execute `docker build . --file ./Dockerfile.dev`
2. Execute `docker images` and grab the **IMAGE_ID** for the just built image
   * Will reference as **I_ID** for remaining instructions
3. Execute, `docker run -p 8080:8080 -e REACT_APP_API_URL=<YOUR_BACKEND_URL> <I_ID>`
   * For local: `REACT_APP_API_URL=http://localhost:8000`
4. In a chrome browser navigate to, `http://localhost:8080` and see your sweet, sweet app!

### Cypress

> Firstly, the cypress folder at the root of the project has two folders containing specs. The single `.spec` file in the `integration` folder is for the P1 pipeline. The `.spec` files under the `e2e` folder are for local testing of cypress.

> Tests located in the `e2e` folder require the API server to be running locally because they test the entire workflow. There should be no mocking of API responses because we are configuring the database to a specific state before each spec to test a workflow. Each `.spec` should be able to be tested independently and, should it fail, the `.spec` should not affect other test files.

**NOTE** If the API database schema (tables/columns/etc.) is altered, an updated schema will need to be acquired and pasted into `/cypress/support/sql/schema.sql`. Getting the schema can be done by exporting the database from [adminer](http://localhost:8181/?server=db&username=localDBUser&db=appDB&dump=) without the data.

#### Local setup

0. Midas API is running locally
0. Midas UI is running locally
0. mysql is installed
    -  The spec files reset and set the database to specific states to test specific workflows; this is accomplished with the mysql cli. If you have homebrew installed, run `brew install mysql`

> You should now be able to run `yarn cypress:open` to interact with the cypress client and run specific tests. If you want to run all tests through just once, execute, `yarn cypress:run`

