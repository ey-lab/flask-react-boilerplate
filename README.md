# Flask-React-Boilerplate
This project has been developped in order to gather best practices at
 - **Building React Single Page Applications** that allow to fetch data from Web APIs
 - **Building Python Flask REST APIs** that efficiently and safely expose data to the Web

This project is intended for developpers who desire to accomodate with React and/or Flask technologies. It covers a large panel of librairies and aims to include best practices at developping robust Web Applications.

This boilerplate is made of 2 independant projects one for React Single Page Application and one for Python Flask API. A reader interested in only one of these 2 technologies can totally give focus on it without meeting any misunderstanding. Nevertheless both projects are designed to be compatible.

## Packages
### React
 - [Create-React-App](https://github.com/facebookincubator/create-react-app) - Facebook project intended to easily package React Applications
 - [Redux](https://github.com/reactjs/redux) - Very popular package that allows proper Application State management
 - [React-Router](https://github.com/ReactTraining/react-router) - Package that allows to dynamically manage Applications Route
 - [Redux-Saga](https://github.com/redux-saga/redux-saga) - Package that properly handles side effects (e.g. asynchronous fetch calls)
 - [Redux-Form](https://github.com/erikras/redux-form) - Package that allows to easily synchonize forms and Redux state
 - [Material-UI](https://github.com/callemall/material-ui) - Library of  React components that implements *Google Material Design* specification

### Python
 - [Flask](https://github.com/pallets/flask) - Python microframework for Web development.
 - [Flask-RESTful](https://github.com/flask-restful/flask-restful) - Flask extension that allows to easily expose REST APIs
 - [Flask-Login](https://github.com/maxcountryman/flask-login) - Flask extension that manages user session (login, logout, etc.)
 - [Flask-WTF](https://github.com/lepture/flask-wtf) - Flask extension that allows to handle forms. It also includes CSRF protection
 - [SQLAlchemy](https://github.com/zzzeek/sqlalchemy) - Object Relationship Mapper (ORM) that allows easy dialog with SQL databases
 - [Marshmallow](https://github.com/marshmallow-code/marshmallow) - Convenient package to serialize/deserialize Python objects into json format
 - [Flask-Script](https://github.com/smurfix/flask-script) - Convenient Flask extension that allows to implement CLI commands