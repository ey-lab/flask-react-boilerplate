from flask_security import SQLAlchemyUserDatastore

from .models import User, Role, db

user_datastore = SQLAlchemyUserDatastore(db, User, Role)

def _commit(response=None):
    user_datastore.commit()
    return response