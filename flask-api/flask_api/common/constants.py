# Limit String Length in databases
STRING_LENGTH = 255

# Key used to stored csrf token transmitted to the client
CSRF_TOKEN_KEY = 'csrfToken'

# Allowed domains for Cross Origin Requests
ALLOWED_CROSS_ORIGIN_DOMAIN = [
    'http://localhost:3000',
]

# Auth resource constants
# Patch of the API
AUTH_BLUEPRINT_NAME = 'auth'
AUTH_URL_PREFIX = '/auth'
LOAD_AUTH_RESOURCE= '/loadAuth'
LOGIN_RESOURCE= '/login'
LOGOUT_RESOURCE = '/logout'

# MESSAGES
UNAUTHORIZED_ERROR_MESSAGE = "User unauthorized to access the requested resource"
LOGIN_ERROR_MESSAGE = "Invalid provided credentials"
