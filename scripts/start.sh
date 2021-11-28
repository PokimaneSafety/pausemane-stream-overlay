#!/usr/bin/env bash
yarn workspace @pokimane-safety/app start &
APP_PID=$?
yarn workspace @pokimane-safety/service start:watch
wait $APP_PID
