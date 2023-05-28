# Team Name: 

BrainBuds

# Proposed Level of Achievement: 

Apollo 11 

# Motivation 

The large flexibility of creating stories and posts on instagram may leave social media users not knowing what to do in order to retain audience and curate the best posts for their audience. 

As such, the utilisation of our application will allow them to monitor their metrics in a dashboard and allow them to understand their audience better, giving the users suggestions on how to produce an effective strategy for successful content.
 

# Aim 

We hope to make content planning and management more convenient and optimal for boosting growth for Instagram users.

# User Stories

As a content creator who wants to popularise my content to a wider audience, I want to be able to quickly identify current trends and be suggested content ideas.
As a small content creator without a professional social media management team, I want to be able to manage my social media platforms with minimal costs.
As a content creator, I want to be able to monitor interactions with my followers to create a tight-knit community.
As an administrator who wants to keep user’s data safe, I want to be able to ensure the security of the system and database.

# Features and Timeline

A Web application that will have a dashboard, allowing users to monitor their Instagram performance, as well as an Artificial Intelligence to provide users with optimal strategies for successful content creation. 

Performance factors such as:
Followers growth
Engagement Rates (Likes, comments, shares)
Posts’ reach

Through these performance factors, users can know when is the best time to post, the type of content that generates the most engagement and more. 

Other features include caption generator, hashtag generator, scheduler for auto-posting, etc.

# Login Page:

Logo at the top
Fields for username and password
"Log In" button
"Forgot Password" and "Sign Up" links

# Dashboard Main Page:

Navigation bar on the left side with options like "Home", "Analytics", "Scheduler", "Caption Generator", "Hashtag Generator", "Settings", etc.
On the Home page, display a brief overview of the key metrics such as follower growth, engagement rate, and post reach.
A section for "Recommended Posting Time" and "Recommended Content Type" based on AI analysis.

# Analytics Page:

Graphs or charts for follower growth over time, engagement rates, and post reach.
Breakdown of engagement types (likes, comments, shares).
Option to select date ranges for viewing historical data.

# Scheduler Page:

Calendar view for scheduling posts.
Option to upload images or videos, write captions, and add hashtags.
List view of scheduled and past posts.

# Caption Generator Page:

Input field for keywords or topics.
Button to generate a caption.
Display area for the generated caption with the option to copy or add to a scheduled post.

# Hashtag Generator Page:

Input field for keywords or topics.
Button to generate hashtags.
Display area for the generated hashtags with the option to copy or add to a scheduled post.

# Settings Page:

Fields for user account details and preferences.

Features to be completed by the mid of June:
Synching data with Instagram + monitoring performance factors
Designing user interface

Features to be completed by mid of July:
Training AI to suggest social media strategies
Suggesting post time for max engagement

Mechanisms to collect datasets for analysis

# Tech Stack

Typescript/Javascript
Firebase
Python
Express/Nextjs
Amazon EC2

We will be utilising Next.JS and typescript for our frontend to ensure type safety. This will be coupled with firebase for authentication as well as data storage. We will be utilising python to create the machine learning model and Amazon EC2 for deployment of the ML model online. 

We will also be utilising Instagram Graph API for access to data that Instagram provides.


# Explanation of codebase

We will be segregating our codebase folders into multiple folders.

Pages: This contains the pages of our application, where each file in this folder represents a unique route or URL endpoint.

Components: The components folder is where we store reusable UI components. These components encapsulate specific functionalities or visual elements and can be reused across multiple pages or sections of your app.

Config: The config folder typically contains configuration files for our application. These files can include environment-specific settings, API keys, database configurations, or any other application-level configurations. Keeping these configurations in a separate folder makes it easier to manage and update them, especially when working with different environments (e.g., development, staging, production). In our case, we utilise it to store our firebase configurations. 

Context: The context folder is used to store files related to application-level state management using React's Context API or other state management libraries like Redux. By centralizing the management of shared data and providing it to components throughout our app, the Context folder helps improve code organization, decoupling, and facilitates the handling of global application state. Here, we store our context for firebase so that the user information can be passed down across the different pages and components. 

# Secret / Environment Variables
We also store all our secrets (for firebase configuration) within a .env.local file to ensure security.

Inside the newly created project, you can run some commands:

#### `yarn install / npm install`

This helps downloads the dependencies from package.json to run the application. 

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



