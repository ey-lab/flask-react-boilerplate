import json

from flask import Blueprint, request, after_this_request, jsonify
from flask_restful import Api, Resource
from flask_restful.utils.cors import crossdomain
from flask_security import login_user, logout_user, current_user
from flask_security.forms import LoginForm
from werkzeug.datastructures import MultiDict
from werkzeug.exceptions import BadRequest, Unauthorized
from werkzeug.wrappers import Response

from ..user import _commit, user_schema

from ..common import AUTH_BLUEPRINT_NAME, AUTH_URL_PREFIX, ALLOWED_CROSS_ORIGIN_DOMAIN, \
    LOAD_AUTH_RESOURCE, LOGIN_RESOURCE, LOGOUT_RESOURCE, \
    UNAUTHORIZED_ERROR_MESSAGE, LOGIN_ERROR_MESSAGE

from ..common.utils import insert_csrf_token

# Make auth API
auth_bp = Blueprint(AUTH_BLUEPRINT_NAME, __name__, url_prefix=AUTH_URL_PREFIX)
auth_api = Api(auth_bp)


class LoadAuth(Resource):
    """
    Resource responsible for authentification loading
    """
    @crossdomain(origin=ALLOWED_CROSS_ORIGIN_DOMAIN, credentials=True)
    def get(self):
        if not current_user.is_authenticated:
            # Generate a 401 error response including a csrf token
            unauth_error = Unauthorized(UNAUTHORIZED_ERROR_MESSAGE)
            content = insert_csrf_token({'data': unauth_error.get_body()})
            return Response(json.dumps(content), unauth_error.code, unauth_error.get_headers())
        else:
            print(type(user_schema.dump(current_user).data))
            print(user_schema.dump(current_user).data)
            return jsonify(insert_csrf_token({'data': user_schema.dump(current_user).data}))

    # Handles preflight OPTIONS http request
    @crossdomain(origin=ALLOWED_CROSS_ORIGIN_DOMAIN, methods=['GET'], headers=['content-type'], credentials=True)
    def options(self):
        # When cross domain decorator is fired on OPTIONS http request a response is automatically sent
        # (change param automatic_options to False in order to call the function)
        pass


class Login(Resource):
    """
    Resource responsible for login
    """
    @crossdomain(origin=ALLOWED_CROSS_ORIGIN_DOMAIN, credentials=True)
    def post(self):
        login_form = LoginForm(MultiDict(request.get_json()))

        if login_form.validate_on_submit():
            login_user(login_form.user, remember=login_form.remember.data)
            after_this_request(_commit)
            return jsonify(user_schema.dump(current_user).data)

        # login failed
        login_error = BadRequest(LOGIN_ERROR_MESSAGE)
        return Response(json.dumps({"errors": login_form.errors, "_error": LOGIN_ERROR_MESSAGE}), login_error.code, login_error.get_headers())

    # Handles preflight OPTIONS http requests
    # Since a POST request is expected x-csrftoken header must be allowed in order to enable the main request to transmit the csrf token to the server
    @crossdomain(origin=ALLOWED_CROSS_ORIGIN_DOMAIN, methods=['POST'], headers=['content-type', 'x-csrftoken'], credentials=True)
    def options(self):
        # When cross domain decorator is fired on OPTIONS http request a response is automatically sent
        # (change param automatic_options to False in order to call the function)
        pass


class Logout(Resource):
    """
    Resource responsible for logout
    """
    @crossdomain(origin=ALLOWED_CROSS_ORIGIN_DOMAIN, credentials=True)
    def get(self):
        if current_user.is_authenticated:
            logout_user()
            return jsonify({})

        else:

            return Unauthorized(UNAUTHORIZED_ERROR_MESSAGE).get_response()

    # Handles preflight OPTIONS http requests
    # Since a POST request is expected x-csrftoken header must be allowed in order to transmit csrf token to the server
    @crossdomain(origin=ALLOWED_CROSS_ORIGIN_DOMAIN, methods=['GET'], headers=['content-type', 'x-csrftoken'], credentials=True)
    def options(self):
        # When cross domain decorator is fired on OPTIONS http request a response is automatically sent
        # (change param automatic_options to False in order to call the function)
        pass

# Add ressources
auth_api.add_resource(LoadAuth, LOAD_AUTH_RESOURCE)
auth_api.add_resource(Login, LOGIN_RESOURCE)
auth_api.add_resource(Logout, LOGOUT_RESOURCE)
