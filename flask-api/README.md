# Flask-API
This project aims to build a robust Python Flask RESTful API that efficiently and safely exposes data to the Web. It uses [Flask](https://github.com/pallets/flask) as main underlying technology. Choosing Flask can be argued by multiple reasons, main ones being
 - Flask is a light weighted framework that has proven its robustness and efficiency
 - Flask makes no assumptions on the rest of your stack so it easily integrates with any other Python librairies
 - It naturally fits in dockerized microservices architectures
 - Flask is very popular and the community is very active, making it very straight forward to skill up on
 - More generally, Python is amazing ! :-)

## Table of Contents
1. [Packages](#Packages)
2. [Getting Started](#getting-started)
3. [Application Structure](#application-structure)
4. [Implementation](#implementation)
5. [Testing](#testing)
6. [Deployment](#deployment)


## Packages
This project covers usage of multiple libraries that facilitates creating REST APIs with Python, main ones being
 - [Flask](https://github.com/pallets/flask) - Python microframework for Web development.
 - [Flask-RESTful](https://github.com/flask-restful/flask-restful) - Flask extension that allows to easily expose REST APIs
 - [Flask-Login](https://github.com/maxcountryman/flask-login) - Flask extension that manages user session (login, logout, etc.)
 - [Flask-WTF](https://github.com/lepture/flask-wtf) - Flask extension that allows to handle forms. It also includes CSRF protection
 - [SQLAlchemy](https://github.com/zzzeek/sqlalchemy) - Object Relationship Mapper (ORM) that allows easy dialog with SQL databases
 - [Marshmallow](https://github.com/marshmallow-code/marshmallow) - Convenient package to serialize/deserialize Python objects into json format
 - [Flask-Script](https://github.com/smurfix/flask-script) - Convenient Flask extension that allows to implement CLI commands

## Getting Started
### Installation
You can get all scripts from this project by cloning the Github repository
```bash
$ git clone
$ cd flask-api
```

In order to run this project, we highly recommend to use a python virtual environment with a version of Python 3.4 or higher. Assuming you have a Python 3 version installed that is bound to ```python3```, you can create a virtual environment by typing
```bash
$ virtualenv venv -p python3
```
If ```virtualenv``` command is not recognized, you can try to install it via

```bash
$ pip install virtualenv
```
Once the virtual environment is created you can install all python dependencies
```bash
$ . venv/bin/activate # on linux and MacOS
$ pip install -r requirements.txt
```
For full information concerning ```virtualenv``` please refer to the [official documentation](https://virtualenv.pypa.io/en/stable/).

### Running
***TODO : to be completed***

## Application Structure
The application structure is inspired from [fbone](https://github.com/imwilsonxu/fbone)
```
.
├── config/                  # Flask configuration module
│   ├── __init__.py          # Manage exports
│   ├── cfg.py               # Flask and Flask extensions configurations
│   └── secret_generator.py  # Secret keys file generator
├── flask_api/               # Application source code
│   ├── resources/           # API Resources implementation
│   │   │── __init__.py      # Manage exports
│   │   └── auth.py          # Main file for layout
│   ├── user/                # User module that allow to access users' information
│   │   ├── __init__.py      # Manage exports
│   │   ├── models.py        # SQLAlchemy models (User, Role)
│   │   ├── helpers.py       # Convenient functions to manipulate SQLAlchemy models
│   │   ├── serializers.py   # Marshmallow schema to serialize User SQLAlchemy objects
│   │   ├── manager.py       # Flask-Script CLI commands to manipulate User database
│   │   └── constants.py     # Set of convenient constants
│   ├── common/              # Set of elements useful for the whole application
│   │   ├── __init__.py      # Manage exports
│   │   ├── utils.py         # Functions that  every-where in the application
│   │   └── constants.py     # Set of convenient constants
│   ├── __init__.py          # Main HTML page container for app
│   ├── app.py               # Functions that allow App instantiation
│   ├── decorators.py        # Set of useful decorators
│   └── extensions.py        # Instantiate flask extensions ()
├── run.py                   # Script that run the application
└── manage.py                # Flask-Script CLI commands to manipulate initialize databases
```

## Implementation
***TODO : to be completed***

## Testing
***TODO : to be completed and implemented***

## Deployment
***TODO : to be completed***



