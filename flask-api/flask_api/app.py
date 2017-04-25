from flask import Flask

from config import set_config
from .user import user_datastore

__all__ = [
    'create_app',
]


def create_app():
    app = Flask(__name__)

    set_config(app)
    configure_extensions(app)
    configure_blueprints(app)
    configure_hook(app)

    return app


def configure_extensions(app):
    from .extensions import db, security, csrf
    # flask-sqlalchemy
    db.init_app(app)

    # Flask csrf protection
    csrf.init_app(app)

    # flask-security
    security.init_app(app, user_datastore, register_blueprint=False)


def configure_blueprints(app):
    from .resources import bp_list
    for bp in bp_list:
        app.register_blueprint(bp)


def configure_hook(app):
    from flask import session

    @app.before_request
    def before_request():
        # Update session cookie expiration date
        session.permanent = True
        session.modified = True
