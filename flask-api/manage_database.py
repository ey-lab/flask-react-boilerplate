from flask_api.app import create_app, db
from flask_api.user import user_datastore

from flask_security.utils import encrypt_password

with create_app().app_context():
    db.drop_all()
    db.create_all()
    user_datastore.create_role(name="admin")
    user_datastore.create_role(name="user")
    user_datastore.create_user(email="nicolas.maurice@fr.ey.com", password=encrypt_password("EYlab17"), roles=["admin"])
    user_datastore.create_user(email="julien.marchand@fr.ey.com", password=encrypt_password("EYlab17"), roles=["user"])
    user_datastore.create_user(email="nicolas.burel@fr.ey.com", password=encrypt_password("EYlab17"), roles=["user"])

    db.session.commit()
    print("Users created")
