import configparser
import os

def generate_secrets_file(path):
    config = configparser.ConfigParser()

    # SECRETS
    secrets = ['SECRET_KEY', 'WTF_CSRF_SECRET_KEY', 'CSRF_SESSION_KEY',
               'SECURITY_PASSWORD_SALT', 'SECURITY_CHANGE_SALT', 'SECURITY_RESET_SALT',
               'SECURITY_CONFIRM_DEVICE_SALT', 'SECURITY_HISTORIC_COOKIE_SIGNING_SALT']
    config['SECRETS'] = {secret: os.urandom(32).hex() for secret in secrets}

    with open(path, 'w') as configfile:
        config.write(configfile)

if __name__ == '__main__':
    generate_secrets_file('secrets.cfg')