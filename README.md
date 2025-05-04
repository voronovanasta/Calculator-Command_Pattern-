## “Task”

Task: https://drive.google.com/file/d/15jVnBPXaZrjs99KOUxp4TGq6Inau6xq_/view

## Deploy

Deploy: https://voronova-calculator-commandpattern.netlify.app/

## Installation

Step-by-step installation instructions to set up the project locally:

1. Clone the repository to your local machine:
   git clone https://github.com/voronovanasta/Calculator-Command_Pattern-.git

2. Install the project dependencies using your preferred package manager:

- Using npm:
  npm install

**Note!** The project runs on the version Node.js 22.9.0.

4. Run the project locally:

- Using npm:
  npm start

## Project Structure

The project's directory structure is organized in the following way:

- **src/**: This folder contains the source code for the project.

  - **js/**: Stores Calculator MVC , every component according to this pattern stores in its folder respectively.
    - **controller** - controller class of calculator
    - **model** - model class of calculator
    - **view** - view class of calculator
    - **commands.js** - file with classes for calculator's operations according to the Command pattern.
    - **commands.test.js** - file with tests for classes for calculator's mathematical operations.
  - **css/**: Holds global style files, SCSS or styled components, and theme-related configurations.

- **dist/**: The build output from Webpack when the project is compiled and bundled for production deployment.

## Scripts

#### `npm start`

Description: Run the project using the development server.

#### `npm run build`

Description: Build the project for production transpiling JS code and generating a production-ready build of the application in a single command.

#### `npm run lint`

Description: Run ESLint to check for code quality and formatting issues and attempt to automatically fix any fixable issues found in the code.

#### `npm run test`

Description: Run all tests in ... .test.js files to test functionality of the main calculator's operations.

Note: Initialize the "husky" package, configuring and setting up Git hooks according to the project's defined configuration, ensuring that the defined hooks are in place and ready to be used during development.
