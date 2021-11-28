#!/usr/bin/env bash
TARGET=$1
shift

PREFIX="@pokimane-safety"

packages=();
for package in "$@"; do
    packages+=("${PREFIX}/${package}");
done

yarn lerna add --scope=@pokimane-safety/$TARGET "${packages[@]}"
