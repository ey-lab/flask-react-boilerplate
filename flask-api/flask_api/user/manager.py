from flask_script import Manager, prompt, prompt_pass, prompt_choices
from flask_security.utils import encrypt_password
from .helpers import user_datastore


manager = Manager(usage="Perform user database management")


@manager.command
def create_role():
    """
    Creates a role in the database"
    """
    name = prompt("Please enter the name of the Role ?", default='user')
    user_datastore.find_or_create_role(name)
    user_datastore.commit()


@manager.command
def create_user():
    """
    Creates a user in the database
    """
    email = prompt("Please enter your email address ?", default='user.name@domain.com')

    password_match = False
    while not password_match:
        password = prompt_pass("Please enter your password ?", default='password')
        confirm_password = prompt_pass("Please confirm your password ?", default='password')
        password_match = password == confirm_password

    role = prompt_choices("Please enter your role ?",
                          choices=[role.name for role in user_datastore.role_model.query],
                          resolve=str,
                          default='user')

    first_name = prompt("Please enter your first name ?", default="user")
    last_name = prompt("Please enter your first name ?", default="name")
    user_name = prompt("Please enter your first name ?", default="uname")

    user_datastore.create_user(email=email,
                               password=encrypt_password(password),
                               roles=[role],
                               first_name=first_name.capitalize(),
                               last_name=last_name.capitalize(),
                               user_name=user_name)
    user_datastore.commit()
