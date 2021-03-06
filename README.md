# Spider Graph
An app for quickly creating beautiful spider graphs and saving them for future editing or download.
## [Deployed](https://spidergraph.now.sh/)
## Demo Credentials:
username: demo

password: what'smyboggle?

# Motivation
Chart or graph generators are typically full of options and graph types which make it difficult to create and save charts that look nice. Spider graph specifically focuses on spider or radar graphs and provides an easy to use interface to building charts that look great by default.

## [Product Vision](https://www.notion.so/Product-Vision-bcc33f41ecc94cd395ebdbb4504b1f23)

# Development
## Available Scripts

In the project directory, you can run:

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn build:serve`

Serves the build files. Open [http://localhost:3000](http://localhost:3000) to
view it in the browser.

### `yarn format`

Formats all .css, .js, and .jsx source files with prettier and stylelint.

### `yarn lint`

Lints all .js and .jsx source files with eslint.

### `yarn prettier`

Runs prettier on all .js, .jsx, and .json source files.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Dev Features

### Husky & Lint-Staged

Runs prettier on all source files and sorts package.json file prior on each
commit.

### Eslint

If you want to use elint, you can turn on the plugin in your editor. If not
, that's okay. Eslint will not run automatically. See .eslintrc for rule
details.

### Prettier

Prettier will be run on each commit to keep code style consistent. See
.prettierrc for rule details.

### Stylelint

Lints CSS and CSS-in-JS and sorts properties.
