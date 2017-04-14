from .constants import CSRF_TOKEN_KEY

from flask_wtf.csrf import generate_csrf

def insert_csrf_token(elements):
    return dict(elements, **{CSRF_TOKEN_KEY: generate_csrf()})