#!/usr/bin/env bash
WORKSPACE=$1
shift
yarn workspace @pokimane-safety/$WORKSPACE "$@"
