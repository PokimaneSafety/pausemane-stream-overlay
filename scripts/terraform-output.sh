#!/usr/bin/env bash
cd "$(dirname "$0")/../terraform"
echo -e "$(terraform output $1)\c"
