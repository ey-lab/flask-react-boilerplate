from flask_api import create_app, socketio

app = create_app()

if __name__ == '__main__':
    if app.config['EXT_SOCKETIO']:
        socketio.run(app)
    else:
        app.run()
