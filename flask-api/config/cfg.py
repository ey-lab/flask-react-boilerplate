import configparser
import datetime
import os
import re


class BaseConfig:
    APP_NAME = 'EY App'

    # Define the application directory
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))

    # Define the database
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    DATABASE_CONNECT_OPTIONS = {}

    # Application threads. A common general assumption is
    # using 2 per available processor cores - to handle
    # incoming requests using one and performing background
    # operations using the other.
    THREADS_PER_PAGE = 2


class ExtConfig:
    EXT_SOCKETIO = False


class SessionCookieConfig:
    PERMANENT_SESSION_LIFETIME = datetime.timedelta(days=7)
    SESSION_COOKIE_HTTPONLY = False

class SecurityConfig:
    # Enable protection agains *Cross-site Request Forgery (CSRF)*
    CSRF_ENABLED = True
    WTF_CSRF_FIELD_NAME= 'csrfToken'
    SECURITY_PASSWORD_HASH = 'bcrypt'

    # Config related to password complexity
    SECURITY_PASSWORD_MINIMAL_LENGTH = 8
    SECURITY_PASSWORD_COMPLEXITY_CONTROLLERS = [re.compile('.*[a-z]+.*'), re.compile('.*[A-Z]+.*'), re.compile('.*\d+.*')]

    # Config related to password change
    SECURITY_CHANGEABLE = True
    SECURITY_SEND_PASSWORD_CHANGE_EMAIL = False


class DevelopmentConfig(BaseConfig, SessionCookieConfig, ExtConfig, SecurityConfig):
    SERVER_NAME = 'localhost:5000'
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BaseConfig.BASE_DIR, 'app.db')
    FLASK_SOCKETIO_ASYNC_MODE = 'threading'
    SAFE_SECRETS = False
    CORS_ALLOWED_ORIGINS = ['127.0.0.1', 'localhost']


class ProductionConfig(BaseConfig, ExtConfig, SecurityConfig):
    DEBUG = False
    FLASK_SOCKETIO_ASYNC_MODE = 'eventlet'
    SAFE_SECRETS = True
    CORS_ALLOWED_ORIGINS = ['lab-apps.fr', 'ey-analytics.com']


config = {'development': DevelopmentConfig,
          'production': ProductionConfig}


def set_config(app, config_name=None):
    if not os.path.isfile('config/secrets.cfg'):
        from config.secret_generator import generate_secrets_file
        generate_secrets_file('config/secrets.cfg')

    general_config = read_config_file('config/machine.cfg')
    secrets_config = read_config_file('config/secrets.cfg')

    # Use in order: config_name or general_config['ENVIRONMENT'] or development by default
    config_name = (config_name or (general_config['ENVIRONMENT'] if 'ENVIRONMENT' in general_config else 'development')).lower()
    print(config_name, 'configuration')
    app.config.from_object(config[config_name])

    app.config = {**app.config, **general_config, **secrets_config}

    return app.config


def read_config_file(path):
    if not os.path.isfile(path):
        raise FileExistsError(path + ' configuration file does not exist. Please create it.')

    config_parser = configparser.ConfigParser()
    config_parser.read(path)
    return {key.upper(): config_parser[section][key] for section in config_parser.sections() for key in config_parser[section]}
