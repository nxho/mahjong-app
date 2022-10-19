#! /usr/bin/env bash

MAHJONG_ENV=prod gunicorn server:app -k eventlet -w 1 -b :8000

