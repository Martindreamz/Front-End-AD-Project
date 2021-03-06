<div float=right>
  <img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5382f6b0-53fe-4086-b2a8-0bd47762cf3a%2Flogo.png?table=block&id=2d9d5067-a082-43b4-a538-8e24e63b95b2&width=1670&userId=&cache=v2" width="400" alt="logo"/>
</div>


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and deployed on firebase: https://logicuniversityweb.web.app.

# Team8-AD Project Stationery Store Inventory System

#Login as following actors with email and default password: 123
- Store Manager (martin@gmail.com)
- Store Supervisor (tin@gmail.com)
- Store Clerk (esther@gmail.com)
- Dept Staff (peter3@gmail.com)
- Dept Rep (peter2@gmail.com)
- Dept Head (peter@gmail.com)

Known bug when pulling from github
- node.js corrupted when pulled from github 
Run npm audit fix, if fail run npm update in the terminal
- Error from missing external library 
 1) npm install datetime
 2) npm install date-fns
 3) npm install react chart js
- raise purchase order may not function properly on cloud but working normally on localhost


## Table of Contents
- [Background](#background)
- [Platform](#platform)
- [Application Structure](#structure)
- [Contributors](#contributors)
- [License](#license)


## Background
This is a Stationery Store Inventory System Front-end Application

## Platform
- Backend: C# .NET Core Web Application to offer Web API Services (deployed via Azure)
- Databased: MsSQL Server (deployed via Azure)
- Frontend: ReactJS for Web & Android studio for Mobile App (deployed via Firebase)
- Machine Learning:Python & Flask (deployed via Azure

## Contributors
<a href="https://github.com/darylkouk/front-end-ad-project/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=darylkouk/front-end-ad-project" />
</a>

Made with [contributors-img](https://contributors-img.web.app).


## .NET Core Frontend Structure
### Components:
  - Reusable web components for screens
### Containers:
  - Screens for app
### Configurations
  - config
 
### Other techiques

### External Libraries
  - Material UI
  - React Chart-js
  
## License


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
