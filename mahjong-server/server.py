import socketio
import eventlet

sio = socketio.Server()
app = socketio.WSGIApp(sio, static_files={
    '/': {'content_type': 'text/html', 'filename': 'index.html'}
    })

@sio.on('connect')
def connect(sid, environ):
    print('connect ', sid)

@sio.on('text_message')
def message(sid, data):
    session = sio.get_session(sid)
    sio.emit('text_message', room='game', data);
    print(f'{session["username"]} says:', data)

@sio.on('update_tiles')
def update_tiles(sid, data):
    sio.emit('update_tiles', room='game', skip_sid=sid, data);

@sio.on('enter_game')
def enter_game(sid, username):
    sio.save_session(sid, {'username': username})
    sio.enter_room(sid, 'game')

@sio.on('leave_game')
def leave_game(sid):
    sio.leave_room(sid, 'game')

@sio.on('disconnect')
def disconnect(sid):
    print('disconnect ', sid)

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 5000)), app)
