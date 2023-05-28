# 🧠 BrainBuds

## 🎯 Proposed Level of Achievement: Apollo 11

## 🌟 Motivation 

We believe that Instagram's vast creative possibilities may sometimes overwhelm users, leaving them unsure of how to best retain and curate posts for their audience. Our application, **BrainBuds**, is a solution that enables them to monitor their metrics in a dashboard, understand their audience better, and receive suggestions on how to devise effective strategies for successful content creation. 

## 🚀 Aim 

Our mission is to make content planning and management more convenient and effective for Instagram users, boosting their growth potential.

## 👥 User Stories

1. **As a content creator** wanting to reach a wider audience, I want to quickly identify current trends and receive content ideas suggestions.
2. **As a small content creator** without a professional social media management team, I aim to manage my social media platforms at minimal costs.
3. **As a content creator**, I want to monitor interactions with my followers to foster a tight-knit community.
4. **As an administrator** concerned about user’s data safety, I want to ensure the security of the system and database.

## ⏰ Features and Timeline

Our web application provides users with a dashboard to monitor their Instagram performance, along with an AI that suggests optimal strategies for successful content creation. 

Key performance metrics include:
- Follower growth
- Engagement rates (likes, comments, shares)
- Post reach

Our other features include a caption generator, a hashtag generator, and a scheduler for auto-posting, among others.

### 🎨 Login Page (Firebase):

- Top-placed logo
- Username and password fields
- "Log In" button
- "Forgot Password" and "Sign Up" links

### 🏠 Dashboard Main Page: (June)

- Left-side navigation bar (Home, Analytics, Scheduler, Caption Generator, Hashtag Generator, Settings, etc.)
- Home page overview of key metrics (follower growth, engagement rate, post reach)
- "Recommended Posting Time" and "Recommended Content Type" sections, based on AI analysis

### 📊 Analytics Page: (Throughout June)

- Graphs/charts displaying follower growth, engagement rates, and post reach over time (June Week 1)
- Engagement breakdown (likes, comments, shares) (June Week 2)
- Date range selection for historical data viewing (June Week 3)

### 📅 Scheduler Page: (June Week 4)

- Calendar view for post scheduling
- Option to upload images/videos, write captions, and add hashtags
- List view of scheduled and past posts

### 🖊️ Caption Generator Page: (July)

- Keyword/topic input field
- Caption generation button
- Display area for generated caption with copying or adding options

### 🏷️ Hashtag Generator Page: (July)

- Keyword/topic input field
- Hashtag generation button
- Display area for generated hashtags with copying or adding options

### ⚙️ Settings Page: (June)

- User account details and preferences fields

**Mid-June Goal**: Sync data with Instagram and monitor performance factors + design user interface

**Mid-July Goal**: Train AI for social media strategy suggestions and optimal post times + collect datasets for analysis

## 🛠️ Tech Stack

- Typescript/Javascript
- Firebase
- Python
- Express/Next.js
- Amazon EC2
- Tailwind CSS

We'll be using Next.JS and TypeScript for frontend, coupled with Firebase for authentication and data storage. Our machine learning model will be created with Python and deployed online with Amazon EC2. Furthermore, we'll utilize Instagram's Graph API for data access.

## 💡 Explanation of codebase

Our codebase will be segregated into multiple folders:

- **Pages**: Contains unique route or URL endpoint files
- **Components**: Houses reusable UI components for encapsulating specific functionalities or visual elements
- **Config**: Stores configuration files
- **Context**: Used to store files related to application-level state management

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
