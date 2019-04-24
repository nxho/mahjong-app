import socketio
import eventlet

sio = socketio.Server()
app = socketio.WSGIApp(sio, static_files={
    '/': {'content_type': 'text/html', 'filename': 'index.html'}
    })

players = []

def deal_tiles():
    for i in range(0, 4):
        player_sid = players[i]
        sio.call('update_tiles', 'asdf', player_sid);

@sio.on('connect')
def connect(sid, environ):
    print('connect ', sid)

@sio.on('text_message')
def message(sid, msg):
    username = sio.get_session(sid)['username']
    sio.emit('text_message', f'{username}: {msg}', room='game');
    print(f'{username} says: {msg}')

@sio.on('update_tiles')
def update_tiles(sid, data):
    sio.emit('update_tiles', data, room='game', skip_sid=sid);

@sio.on('enter_game')
def enter_game(sid, username):
    print(f'{sid} entered game as {username}')
    sio.save_session(sid, {'username': username})
    sio.enter_room(sid, 'game')
    players.append(sid)

    if len(players) == 4:
        deal_tiles()

@sio.on('leave_game')
def leave_game(sid):
    sio.leave_room(sid, 'game')

@sio.on('disconnect')
def disconnect(sid):
    print('disconnect ', sid)

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 5000)), app)
