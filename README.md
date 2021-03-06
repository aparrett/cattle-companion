# [Cattle Companion 0.0.1](https://cattle-companion.herokuapp.com)

[![Website cattle-companion](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://cattle-companion.herokuapp.com)

Cattle Companion is a web application for managing cattle. Specifically, its purpose is to help farmers easily track a cow's family and its family's potential hereditary issues. Keeping track of this information is essential for breeding the healthiest cattle possible.

The app is currently in the prototype stage and development may or may not continue depending on its success during initial testing.

Click [here](https://cattle-companion.herokuapp.com 'Cattle Companion') to view the live application.

## Installation

Download the project files

```
git clone https://github.com/aparrett/cattle-companion.git
```

Change into the newly created directory (cattle-companion by default) and install server dependencies

```
cd cattle-companion
npm i
```

Change into the client directory and install client dependencies.

_Note: Attempting to install the client dependencies from the root directory using the --prefix flag could result in a bug where cmd files are installed into the /client directory. To prevent this, we use cd instead._

```
cd client
npm i
```

Change back into the project root directory and run the application

```
cd ..
npm run dev
```

At this point, you should be able to see the login screen, use the development version of the application, and make changes. Changes to the Express server require a restart; changes to the React side of the application are hot reloaded.

## Running the Tests

This app uses the Jest framework for testing. The back end was created with a Test Driven approach and these tests are integration tests that cover every route. The front end currently only has tests for actions and reducers. The rest of the tests will be added in the near future.

Use `npm run test` from the project root directory to run the back end tests.

Use the same command from the client directory to run the front end tests. **Note:** These tests will be running in watch mode, so you may have to press `a` after executing the test command to run all of the tests.

## Built With

- [Express](https://github.com/expressjs/express) - Back end node.js framework

- [MongoDB](https://github.com/mongodb/mongo) - NoSQL database

- [Mongoose](https://github.com/Automattic/mongoose) - Object modeling for MongoDB and node.js

- [Jest](https://github.com/facebook/jest) - Javascript testing

- [Enzyme](https://github.com/airbnb/enzyme) - React testing

- [Joi](https://github.com/hapijs/joi) - Mongoose model validation

- [React](https://github.com/facebook/react) - Front end library

- [Create React App](https://github.com/facebook/create-react-app) - React application scaffolding

- [Redux](https://github.com/reduxjs/redux) - Predictable state container for JavaScript apps

- [React Redux](https://github.com/reduxjs/react-redux) - React bindings for use with Redux

- [Redux Thunk](https://github.com/reduxjs/redux-thunk) - React Redux middleware for handling async actions

- [Bootstrap](https://github.com/twbs/bootstrap) - CSS library

- [React Font Awesome](https://github.com/FortAwesome/react-fontawesome) - React component for using Font Awesome icons

- [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js

- [Lodash](https://github.com/lodash/lodash) - JS utility library

- [Moment](https://github.com/moment/moment) - JS date library

## TODO

Issues

- [ ] Graceful error handling of async mongoose actions

Features

- [ ] A user can cancel a form.

- [ ] A user can delete an incident.

- [ ] A user can edit a farm's name.

- [ ] A user can add children directly.

- [ ] The cow details page should show a cow's siblings.

- [ ] Validate that incidents are after a cow's date of birth.

- [ ] Deleting a farm and its cattle should use two phase commits.

- [ ] A user can share a farm with another user.

- [ ] A user can filter cows on a farm page.

- [ ] (TBD) A user can add family to a cow from other farms.

## License

There is currently no license and the code in this repository is protected by default.
