#!/usr/bin/env bash
set -euxo pipefail
PACKAGE_SCOPE="@pokimane-safety"
PACKAGE_NAME="service"
PACKAGE_REFERENCE="$PACKAGE_SCOPE/$PACKAGE_NAME"
LERNA_LOG_LEVEL="warn"
DEPENDENCIES=$(yarn --silent lerna ls --json --scope "$PACKAGE_REFERENCE" --include-dependencies --loglevel $LERNA_LOG_LEVEL)
DEPENDENCIES=$(echo "$DEPENDENCIES" | jq -r "[map(.name | sub(\"^$PACKAGE_SCOPE/\"; \"\"))[] | select(. != \"$PACKAGE_NAME\")] | join(\",\")" | sed 's![^,]$!&,!')
yarn lerna run build --scope="$PACKAGE_SCOPE/{$DEPENDENCIES}" --loglevel $LERNA_LOG_LEVEL
yarn workspace "$PACKAGE_REFERENCE" start:watch
