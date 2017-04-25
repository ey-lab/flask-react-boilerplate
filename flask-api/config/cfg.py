import configparser
import datetime
import os
from os.path import dirname, abspath


class BaseConfig:
    APP_NAME = 'Flask-React Boilerplate'
    SERVER_NAME = 'localhost:5000'

    # Define the application directory
    BASE_DIR = abspath(dirname(dirname(__file__)))


class DatabaseConfig:
    # Define the database
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    DATABASE_CONNECT_OPTIONS = {}
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BaseConfig.BASE_DIR, 'app.db')


class SessionCookieConfig:
    PERMANENT_SESSION_LIFETIME = datetime.timedelta(days=7)
    SESSION_COOKIE_HTTPONLY = False


class CSRFConfig:
    # Enable protection agains *Cross-site Request Forgery (CSRF)*
    CSRF_ENABLED = True
    WTF_CSRF_FIELD_NAME = 'csrfToken'
    WTF_CSRF_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE']


class PasswordSecurityConfig:
    # Config related to password security
    SECURITY_PASSWORD_HASH = 'bcrypt'
    SECURITY_PASSWORD_MINIMAL_LENGTH = 8


class DevelopmentConfig(BaseConfig, DatabaseConfig, SessionCookieConfig, CSRFConfig, PasswordSecurityConfig):
    DEBUG = True


config = {
    'development': DevelopmentConfig,
}


def set_config(app, config_name='development'):
    if not os.path.isfile('config/secrets.cfg'):
        from config.secret_generator import generate_secrets_file
        generate_secrets_file('config/secrets.cfg')

    secrets_config = read_config_file('config/secrets.cfg')

    app.config.from_object(config[config_name])
    app.config = {**app.config, **secrets_config}

    return app.config


def read_config_file(path):
    if not os.path.isfile(path):
        raise FileExistsError(path + ' configuration file does not exist. Please create it.')

    config_parser = configparser.ConfigParser()
    config_parser.read(path)
    return {key.upper(): config_parser[section][key] for section in config_parser.sections() for key in config_parser[section]}
