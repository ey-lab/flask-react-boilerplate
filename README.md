# Flask-React-Boilerplate
This project has been developped in order to gather best practices at
 - **Building React Single Page Applications** that allow to fetch data from Web APIs
 - **Building Python Flask Web APIs** that efficiently and safely expose data to the Web

This project is intended for developpers who desire to accomodate with React and/or Flask technologies. It covers a large panel of librairies and aims to include best practices to develop robust Web Applications.

This boilerplate is made of 2 independant projects one for React Single Page Application and one for Python Flask API. A reader interested in only one of these 2 technologies can totally give focus on it without meeting any misunderstanding. Nevertheless both projects are designed to be compatible.

## Packages
### React
 - [Create-React-App]() - Facebook project intended to easily package React Applications
 - [Redux](https://github.com/reactjs/redux) - Very popular package that allows proper Application State management
 - [React-Router](https://github.com/ReactTraining/react-router) - Package that allow to dynamically manage Applications Routes (links, redirections, etc.)
 - [Redux-Saga](https://github.com/redux-saga/redux-saga) - Package that properly handles side effects (e.g. asynchronous fetch calls)
 - [Redux-Form]() - Package that allow to easily synchonize forms and Redux state
 - [Material-UI]() - Librairy of clean and responsive React components. Quick to integrate

### Python
 - [Flask]() - Python micro-framework for Web development. It allows to build light services that easily integrates with any Python library
 - [Flask-Restful]() - Convenient Flask extension to expose APIs. It also includes some functionnalities to handle Cross Origin Requests
 - [Flask-Login]() - Flask extension that manage user login by editing and signing session Cookie
 - [Flask-WTF]() - Popular Flask extension that handles forms. It also provides an implementation for CSRF protection
 - [SQLAlchemy]() - Powerful Python Object Relationship Mapper (ORM) that allows transparent dialog with SQL databases
 - [Marshmallow]() - Convenient package to serialize/deserialize Python objects into json format