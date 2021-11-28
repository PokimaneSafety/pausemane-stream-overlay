#!/usr/bin/env bash
lsof -i:3000 | head -n 2 | tail -n 1 | awk '{ print $2 }' | xargs -n1 -I{} pkill -9 {}
