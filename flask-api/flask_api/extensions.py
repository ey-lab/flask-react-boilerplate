from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

from flask_security import Security
security = Security()

from flask_wtf.csrf import CSRFProtect
csrf = CSRFProtect()

from flask_socketio import SocketIO
socketio = SocketIO()