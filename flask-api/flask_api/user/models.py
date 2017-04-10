from flask_security import RoleMixin, UserMixin

from extensions import db
from common.constants import STRING_LENGTH
from user.constants import ROLE_TABLE_NAME, ROLE_NAME_LENGTH, \
    USER_TABLE_NAME, USER_EMAIL_LENGTH, USER_PASSWORD_LENGTH, \
    USER_LAST_NAME_LENGTH, USER_FIRST_NAME_LENGTH, USER_USER_NAME_LENGTH, \
    SEX_TYPES, SEX_OTHER, USER_STATUS, STATUS_NEW

# n-n mapping table between users and roles
user_role = db.Table('%s_%s' % (USER_TABLE_NAME, ROLE_TABLE_NAME),
                     db.Column('user_id', db.Integer(), db.ForeignKey('%s.id' % USER_TABLE_NAME)),
                     db.Column('role_id', db.Integer(), db.ForeignKey('%s.id' % ROLE_TABLE_NAME)))


class Role(db.Model, RoleMixin):
    __tablename__ = ROLE_TABLE_NAME

    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(ROLE_NAME_LENGTH), unique=True)
    description = db.Column(db.String(STRING_LENGTH))

    def __repr__(self):
        return '<Role %r>' % self.name


class User(db.Model, UserMixin):
    __tablename__ = USER_TABLE_NAME

    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(USER_EMAIL_LENGTH), nullable=False, unique=True)
    password = db.Column(db.String(USER_PASSWORD_LENGTH), nullable=False)

    last_name = db.Column(db.String(USER_LAST_NAME_LENGTH))
    first_name = db.Column(db.String(USER_FIRST_NAME_LENGTH))
    user_name = db.Column(db.String(USER_USER_NAME_LENGTH))

    _sex = db.Column(db.Integer(), nullable=False, default=SEX_OTHER)

    def _get_sex(self):
        return SEX_TYPES.get(self._sex)

    def _set_sex(self, sex):
        self._sex = sex

    sex = db.synonym('_sex', descriptor=property(_get_sex, _set_sex))

    active = db.Column(db.Boolean())
    _status = db.Column(db.Integer(), nullable=False, default=STATUS_NEW)

    def _get_status(self):
        return USER_STATUS.get(self._status)

    def _set_status(self, status):
        self._status = status

    status = db.synonym('_status', descriptor=property(_get_status, _set_status))

    confirmed_at = db.Column(db.DateTime())

    roles = db.relationship('Role',
                            secondary=user_role,
                            backref=db.backref('users', lazy='dynamic'))

    def __repr__(self):
        return '<User %r>' % self.email

