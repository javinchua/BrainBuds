# 🧠 BrainBuds (https://brain-buds.vercel.app/)

### Proposed Level of Achievement: 

🚀 Apollo 11

### 🌟 Motivation

The motivation behind this project is to bridge the gap between charities and potential donors by creating an e-commerce platform specifically designed for charitable organizations. Many people want to support causes they care about, but they may not always know how to contribute effectively. By providing a centralized platform where charities can showcase their specific needs and donors can easily find and purchase products to support those needs, we aim to streamline the donation process and make it more accessible and transparent.

### 🚀 Aim 

The aim of this project is to develop an e-commerce application that connects charities with donors, enabling charities to post their product requirements and donors to browse and purchase those products to support the causes they are passionate about. The application should be user-friendly, secure, and efficient, providing a seamless experience for both charities and donors.

### 👥 User Stories

- As a charity representative, I want to be able to create an account and easily post the products my organization needs, including details such as quantity, description, and preferred specifications.
- As a donor, I want to be able to browse different charities and their product needs, filtering them based on causes I care about or location.
- As a donor, I want to view detailed information about each product requirement, including the charity's mission, impact, and progress towards their goals.
- As a donor, I want to be able to securely make a purchase directly on the platform, knowing that my payment information is protected.
- As a charity representative, I want to be notified when a donor purchases a product from our posted requirements, including the donor's contact information and shipping details.

### ⏰ Features and Timeline

#### Phase 1: Foundation

- Create a user registration and authentication system for charities and donors.
- Implement a user-friendly interface for charities to post product requirements, including relevant details.

#### Phase 2: Product Listings and Donor Experience (June)

- Separate the pages between charities and donors.
- Allow charities to post items they need.
- Notify charities when there is a potential donor and enable easy interaction through chat.
- Enable charities to view donations made.
- Allow donors to browse listed donations, filtering them by category.
- Enable donors to browse different charities and choose the ones they want to contribute towards.
- Facilitate communication between donors and charities through a chat system for each listing.

#### Phase 3: Refinements and Additional Features (July)

- Set up a notification system to alert charities when a donor purchases a product from their requirements.
- Improve the user interface and overall user experience based on feedback and testing.
- Integrate a rating and review system for donors to provide feedback on their donation experience.
- Implement additional features based on user feedback and emerging needs.

### Pages for Charities

- Charity information page
- Charity products listed
- Chat feature
- Browse through donations offered by donors

### Pages for Donors

- Page to view list of charities
- Page to list products for each charity
- Page to list products of every charity
- Donation feature for each product
- Chat feature

### 🛠️ Tech Stack

- Typescript/Javascript
- Firebase
- Express/Nextjs
- Vercel

We'll be using Next.JS and TypeScript for frontend, coupled with Firebase for authentication and data storage.

### 💡 Explanation of Codebase

Our codebase will be segregated into multiple folders:

- `Pages`: Contains unique route or URL endpoint files
- `Components`: Houses reusable UI components for encapsulating specific functionalities or visual elements
- `Config`: Stores configuration files
- `Context`: Used to store files related to application-level state management

## 🤫 Secret / Environment Variables

We store all our secrets (for firebase configuration) within a `.env.local` file to ensure security.

## 🔧 Setup

You can run some built-in commands in the created project:

### `yarn install / npm install`

This command downloads the dependencies from `package.json` needed to run the application.

### `yarn dev`

Runs `next dev` which starts the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Runs `next build` which builds the application for production usage.

### `yarn start`

Runs `next start` which starts a Next.js production server.

### `yarn lint`

Runs the `eslint` command for all files with the `js`, `ts`, `jsx`, and `tsx` extensions. Refer to the `.eslint.json` file for all configuration settings.

### `yarn lint:fix`

Runs the `eslint` command with the `--fix` flag which tries to automatically fix linting problems.

### `yarn lint:cache`

Runs the `eslint` command with the `--cache` flag which only checks the changed files.

### `yarn lint:format`

Runs Prettier which formats all files inside the `src` directory based on the configuration set inside the `.prettierrc` file.

### `yarn type-check`

Runs the `tsc` command to compile the project and check if it has type errors.

### `yarn test`

Runs the `jest` command which runs all tests.

### `yarn test:watch`

Runs the `jest` command with `--watch` flag which runs all tests in watch mode.

### `yarn test:coverage`

Runs the `jest` command with `--coverage` flag which indicates that test coverage information should be collected and reported in the output.
