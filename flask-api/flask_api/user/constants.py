from collections import OrderedDict

ROLE_TABLE_NAME = "roles"
ROLE_NAME_LENGTH = 15
ROLE_ADMIN = 0
ROLE_USER = 1
ROLES = {
    ROLE_ADMIN: 'admin',
    ROLE_USER: 'user',
}
ROLES = OrderedDict(sorted(ROLES.items()))

USER_TABLE_NAME = "users"
USER_EMAIL_LENGTH = 255
USER_PASSWORD_LENGTH = 255
USER_LAST_NAME_LENGTH = 255
USER_FIRST_NAME_LENGTH = 255
USER_USER_NAME_LENGTH = 255


SEX_MALE = 1
SEX_FEMALE = 2
SEX_OTHER = 3
SEX_TYPES = {
    SEX_MALE: 'Male',
    SEX_FEMALE: 'Female',
    SEX_OTHER: 'Other'
}
SEX_TYPES = OrderedDict(sorted(SEX_TYPES.items()))


STATUS_INACTIVE = 0
STATUS_NEW = 1
STATUS_ACTIVE = 2
USER_STATUS = {
    STATUS_INACTIVE: 'inactive',
    STATUS_NEW: 'new',
    STATUS_ACTIVE: 'active',
}
USER_STATUS = OrderedDict(sorted(USER_STATUS.items()))

