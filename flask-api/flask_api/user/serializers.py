from marshmallow import Schema, fields
from .constants import ROLE_NAME_KEY, \
    USER_EMAIL_ADDRESS_KEY, USER_LAST_NAME_KEY, USER_FIRST_NAME_KEY, USER_USER_NAME_KEY


class RoleSchema(Schema):
    id = fields.Int()
    name = fields.Str(dump_to=ROLE_NAME_KEY)


class UserSchema(Schema):
    id = fields.Int()

    email = fields.Str(dump_to=USER_EMAIL_ADDRESS_KEY)

    last_name = fields.Str(dump_to=USER_LAST_NAME_KEY)
    first_name = fields.Str(dump_to=USER_FIRST_NAME_KEY)
    user_name = fields.Str(dump_to=USER_USER_NAME_KEY)

    roles = fields.Nested(RoleSchema, many=True)

user_schema = UserSchema()
