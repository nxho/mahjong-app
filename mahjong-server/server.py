import socketio
import eventlet
from random import randrange
from tile_groups import honor, numeric, bonus

sio = socketio.Server()
app = socketio.WSGIApp(sio, static_files={
    '/': {'content_type': 'text/html', 'filename': 'index.html'}
})

# TODO: use uuids instead of sids
# - generate and return uuid to client when new client joins game
players = {}
player_sids = []
game_tiles = []

def init_tiles():
    for tile_set in [*honor, *numeric, *bonus]:
        for i in range(tile_set['count']):
            for tile_type in tile_set['types']:
                game_tiles.append({
                    'suit': tile_set['suit'],
                    'type': tile_type
                });

def deal_tiles():
    for sid in player_sids:
        player_tiles = players[sid]['tiles']

        for i in range(14):
            random_idx = randrange(len(game_tiles))
            if random_idx != len(game_tiles) - 1:
                game_tiles[random_idx], game_tiles[-1] \
                    = game_tiles[-1], game_tiles[random_idx]

            player_tiles.append(game_tiles.pop())

        sio.emit('update_tiles', player_tiles, sid)

def update_opponents():
    for sid in player_sids:
        sio.emit('update_opponents',
                 list(map(lambda sid: { 'name': players[sid]['name'] },
                          list(filter(lambda other_sid: other_sid != sid, player_sids)))),
                 room=sid)

@sio.on('connect')
def connect(sid, environ):
    print('connect ', sid)

@sio.on('text_message')
def message(sid, msg):
    username = players[sid]['name']
    sio.emit('text_message', f'{username}: {msg}', room='game')
    print(f'{username} says: {msg}')

@sio.on('enter_game')
def enter_game(sid, username):
    print(f'{sid} joined game as {username}')
    sio.enter_room(sid, 'game')

    # TODO: only for testing purposes
    players.clear()
    player_sids.clear()
    game_tiles.clear()

    players[sid] = {
        'name': username,
        'tiles': []
    }
    player_sids.append(sid)

    for i in range(3):
        players[i] = {
            'name': f'opponent_{i}',
            'tiles': []
        }
        player_sids.append(i)

    sio.emit('text_message', f'{username} joined the game', room='game')

    update_opponents()

    if len(players) == 4:
        init_tiles()
        deal_tiles()

@sio.on('leave_game')
def leave_game(sid):
    username = sio.get_session(sid)['username']
    print(f'{sid} left game as {username}')
    player_sids.remove(sid)
    del players[sid]
    sio.leave_room(sid, 'game')

@sio.on('disconnect')
def disconnect(sid):
    # on page reload, remove players from game pool
    if sid in players:
        player_sids.remove(sid)
        del players[sid]
    print('disconnect ', sid)

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 5000)), app)
