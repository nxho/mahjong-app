import socketio
import eventlet

sio = socketio.Server()
app = socketio.WSGIApp(sio, static_files={
    '/': {'content_type': 'text/html', 'filename': 'index.html'}
    })

players = set()

def deal_tiles():
    for player_sid in players:
        sio.call('update_tiles', [], player_sid)

@sio.on('connect')
def connect(sid, environ):
    print('connect ', sid)

@sio.on('text_message')
def message(sid, msg):
    username = sio.get_session(sid)['username']
    sio.emit('text_message', f'{username}: {msg}', room='game')
    print(f'{username} says: {msg}')

@sio.on('update_tiles')
def update_tiles(sid, data):
    sio.emit('update_tiles', data, room='game', skip_sid=sid)

@sio.on('enter_game')
def enter_game(sid, username):
    print(f'{sid} joined game as {username}')
    sio.save_session(sid, {'username': username})
    sio.enter_room(sid, 'game')
    players.add(sid)

    sio.emit('enter_game', username, room='game', skip_sid=sid)
    sio.emit('text_message', f'Server: {username} joined the game', room='game')

    if len(players) == 4:
        deal_tiles()

@sio.on('leave_game')
def leave_game(sid):
    username = sio.get_session(sid)['username']
    print(f'{sid} left game as {username}')
    players.remove(sid)
    sio.leave_room(sid, 'game')

@sio.on('disconnect')
def disconnect(sid):
    # on page reload, remove players from game pool
    if sid in players:
        players.remove(sid)
    print('disconnect ', sid)

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 5000)), app)
