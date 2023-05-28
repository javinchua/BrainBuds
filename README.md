# Next Starter Kit


A boilerplate for creating new projects with Next.js, TypeScript, Tailwind CSS, ESLint, Prettier, Jest, and React Testing Library. Bootstrapped with [create-next-app](https://nextjs.org/docs/api-reference/create-next-app).
<br>
<br>

```

It will create a new directory inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```
 my-app
 ┣ public
 ┃ ┣ fonts
 ┃ ┣ img
 ┣ src
 ┃ ┣ components
 ┃ ┣ pages
 ┃ ┃ ┣ _app.tsx
 ┃ ┃ ┗ index.tsx
 ┃ ┗ styles
 ┃ ┃ ┗ tailwind.css
 ┣ .babelrc
 ┣ .eslintrc.json
 ┣ .gitignore
 ┣ .prettierrc
 ┣ README.md
 ┣ jest.config.js
 ┣ next-env.d.ts
 ┣ package.json
 ┣ postcss.config.js
 ┣ tailwind.config.js
 ┣ tsconfig.json
 ┗ yarn.lock
```

Once the installation is done, you can open your project folder:

```sh
cd next-starter-kit
```

Inside the newly created project, you can run some commands:

#### `yarn dev`

Runs `next dev` which starts the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `yarn build`

Runs `next build` which builds the application for production usage

#### `yarn start`

Runs `next start` which starts a Next.js production server

#### `yarn lint`

Runs the `eslint` command for all files with the `js`, `ts`, `jsx`, and `tsx` extensions. See the `.eslint.json` file for all configuration settings.

#### `yarn lint:fix`

Runs the `eslint` command with the `--fix` flag which tries to automatically fix linting problems.

#### `yarn lint:cache`

Runs the `eslint` command with the `--cache` flag which only checks the changed files.

#### `yarn lint:format`

Runs Prettier which formats all files inside the `src` directory based on the configuration set inside the `.prettierrc` file.

#### `yarn type-check`

Runs the `tsc` command to compile the project and check if it has type errors.

#### `yarn test`

Runs the `jest` command which runs all tests

#### `yarn test:watch`

Runs the `jest` command with `--watch` flag which runs all tests in watch mode

#### `yarn test:coverage`

Runs the `jest` command with `--coverage` flag which indicates that test coverage information should be collected and reported in the output.



