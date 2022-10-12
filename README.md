# Mahjong App

<img src="/mahjong_sample_1.png">

This is a multiplayer Mahjong game application built in ReactJS/Python.

## Client
Built in ReactJS.

### Local dev
Run:
```
cd client
yarn
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Server
Uses Socket.IO for sending/receiving messages to/from client. Served with Gunicorn.

### Local dev
Run:
```
cd server
pip3 install -r requirements.txt
./start.sh
```

By default, server will be running at http://localhost:5000.

