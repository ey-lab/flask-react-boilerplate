from flask_script import Manager
from flask_api import create_app
from flask_api.extensions import db
from flask_api.user import manager as user_manager


manager = Manager(create_app(register_blueprints=False))

@manager.command
def init_db():
    """
    Initializes the tables in the database
    """
    db.drop_all()
    db.create_all()
    db.session.commit()

manager.add_command("user", user_manager)

if __name__ == "__main__":
    manager.run()
