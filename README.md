# MTvI.

Movie / TV Info app based on [TMDB API](https://www.themoviedb.org/documentation/api)

Website: [https://mtvi.netlify.app](https://mtvi.netlify.app)

## Table of Contents

- [Motivation](motivation)
- [Main Technologies](#main-technologies)
- [Development](#development)
  - [Getting Started](#getting-started)
  - [Project Structure](#project-structure)
  - [Commit Message Structure](#commit-message-structure)
- [Notes](#notes)
  - [Node Versions](#node-versions)
- [Possible Enhancements](#possible-enhancements)

## Motivation

This project was created to learn how to build SPA (single page application) with technologies such as [React](https://github.com/facebook/react/), [TypeScript](https://github.com/microsoft/TypeScript), and [Netlify](https://www.netlify.com/).

## Main Technologies

- [Netlify CLI](https://docs.netlify.com/cli/get-started/)
- [Webpack](https://github.com/webpack/webpack)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Babel](https://github.com/babel/babel) + [core-js](https://github.com/zloirock/core-js)
- [Eslint](https://github.com/eslint/eslint) + [Prettier](https://github.com/prettier/prettier)
- [React](https://github.com/facebook/react/)
- [React Router](https://github.com/ReactTraining/react-router)
- [React Query](https://github.com/tannerlinsley/react-query)
- [Axios](https://github.com/axios/axios) + [localForage](https://github.com/localForage/localForage)
- [Material-UI](https://github.com/mui-org/material-ui)
- [Embla Carousel](https://github.com/davidcetinkaya/embla-carousel)

## Development

### Getting Started

1. Clone or download the repo.
1. The following [Node.js](https://nodejs.org/en/) version is required for this project, the recommended way to install a specific version is via [nvm](https://github.com/nvm-sh/nvm), [nvm-windows](https://github.com/coreybutler/nvm-windows) or another Node.js version manager:

   `^14.0.0`

1. Install dependencies using the following command in your project directory, requires [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) (which comes with Node.js).

   ```shell
   $ npm install
   ```

1. Create [Netlify account](https://www.netlify.com/).
1. There are several options how to [create a project](https://docs.netlify.com/site-deploys/create-deploys/) with Netlify, but the most robust one is the [Netlify CLI](https://docs.netlify.com/cli/get-started/) which is used in this project, follow these steps:

   1. [Obtain a token](https://docs.netlify.com/cli/get-started/#obtain-a-token-via-the-command-line).
   1. Use [continuous deployment](https://docs.netlify.com/cli/get-started/#continuous-deployment) (requires [GitHub account](https://github.com/)) or [manual deploys](https://docs.netlify.com/cli/get-started/#manual-deploys).

      For continuous deployment, [it is possible to choose](https://docs.netlify.com/site-deploys/overview/#branch-deploy-controls) which branches will trigger the deployment.

1. Set the following [environment variables](https://docs.netlify.com/configure-builds/environment-variables/) to 'Site settings > Build & deploy > Environment > Environment variables':

   For [TMDB API](https://www.themoviedb.org/documentation/api) (requires account) set `TMDB_API_KEY` as a name and your given key as a value.

   For [serverless functions runtime](https://docs.netlify.com/functions/build-with-javascript/#runtime-settings) set `AWS_LAMBDA_JS_RUNTIME` as a name and `nodejs14.x` as a value.

1. Use the following npm scripts which are aliases for [Netlify Dev](https://cli.netlify.com/netlify-dev) and [Netlify CLI](https://cli.netlify.com/commands/) commands:

   - `netlify:start` - start a local dev server for the build tool you’re using.
   - `netlify:preview` - deploy to a unique draft URL for previewing and testing.
   - `netlify:deploy` - do a production deploy to your main site URL (typically used for manual deploys).

### Project Structure

The `src` folder contains application source code, which I distinguish as follows:

- 'Local' code is located right in the `src` folder and is used only once in `App.*` or `index.*` files. For example `routes` folder and `Footer` component are 'local'.

- 'Shared' code is located in the `shared` folder. This folder contains only code that is needed in more than one place, it can be components, hooks, utils, etc.

- 'Global' code is also located in the `src` folder. It is usually best to keep code that is only relevant for the corresponding feature / module closer to that feature / module, but sometimes it is more convenient to keep certain code in one 'global' folder / file. For example, in this project, the `api` folder is 'global'.

It's a very simple structure, but enough for this project.

### Commit Message Structure

The commit messages are written according to the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/) (mostly).

## Notes

### Node Versions

Node.js versions are specified in several places:

- In the Netlify UI `AWS_LAMBDA_JS_RUNTIME` env variable must be set for [serverless functions runtime](https://docs.netlify.com/functions/build-with-javascript/#runtime-settings).
- In the `.nvmrc` file, so that Netlify knows which version of Node.js it should use to [build your site](https://docs.netlify.com/configure-builds/manage-dependencies/#node-js-and-javascript), can also be set as an env variable in the Netlify UI.
- In the `package.json` `engines` field which `node/no-unsupported-features/*` [rules](https://github.com/mysticatea/eslint-plugin-node/tree/master/docs/rules/no-unsupported-features) use for linting, can also be overwritten by each rule.

## Possible Enhancements

- Internationalization.
- Authentication with [TMDB](https://developers.themoviedb.org/3/authentication/how-do-i-generate-a-session-id) (to be able to rate movies / series, ect.).
- Write tests (not a big project, but with the above enhancements and for practice it could be worth it).
