from flask import Flask

from config import set_config
from extensions import db, security, socketio, csrf
from user import user_datastore

__all__ = [
    'create_app',
]

def create_app(config_name=None):
    app = Flask(__name__)

    set_config(app, config_name)
    configure_extensions(app)
    configure_blueprints(app)
    configure_logging(app)
    configure_hook(app)

    return app

def configure_extensions(app):
    # flask-sqlalchemy
    db.init_app(app)

    # Flask csrf protection
    csrf.init_app(app)

    # flask-security
    security.init_app(app, user_datastore, register_blueprint=False)

    # flask socketio
    if app.config['EXT_SOCKETIO']:
        socketio.init_app(app, async_mode=app.config['FLASK_SOCKETIO_ASYNC_MODE'])

def configure_blueprints(app):
    from ressources import auth_bp
    for bp in [auth_bp]:
        app.register_blueprint(bp)

def configure_logging(app):
    import logging
    from logging.handlers import TimedRotatingFileHandler

    if not app.debug:
        fh = TimedRotatingFileHandler('app.log', when='D')
        fh.setLevel(logging.INFO)
        fh.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
        app.logger.addHandler(fh)

def configure_hook(app):
    from flask import session, request

    @app.before_request
    def before_request():
        print("Request", request, "/n", request.headers)

        for attr in ['method', 'data', 'url', 'url_root', 'base_url']:
            print(attr, ':', getattr(request._get_current_object(), attr))
        print()
        # Update session cookie expiration date
        session.permanent = True
        session.modified = True

    @app.after_request
    def log(response):
        print("Response :\n", response.headers, sep='')
        print("Data :", response.get_data())
        print("status :", response.status)
        return response
