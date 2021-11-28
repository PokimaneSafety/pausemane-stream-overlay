# syntax = docker/dockerfile:1.2

#
# Config
#
ARG NODE_VERSION=16.12

#
# Base Images
#
FROM node:$NODE_VERSION-alpine as runtime_base
FROM node:$NODE_VERSION-alpine as builder_base

#
# Builder Image
#
FROM builder_base as builder
WORKDIR /usr/pokimane-safety
# Install Build Dependencies
RUN --mount=type=cache,id=builder-apk-cache,target=/var/cache/apk ln -vs /var/cache/apk /etc/apk/cache && \
    apk add --update --virtual builder-dependencies \
    make cmake g++ \
    python3 bash jq \
    git curl

RUN --mount=type=cache,id=builder-yarn-global-cache,target=/root/.config/yarn/global \
    yarn global add node-gyp
# Copy Files
COPY ./lerna.json ./package.json ./yarn.lock .yarnclean ./
COPY ./packages ./packages
# Install Dependencies
RUN --mount=type=cache,id=builder-yarn-local-cache,target=/usr/local/share/.cache/yarn \
    yarn install \
    # Use yarn.lock
    --frozen-lockfile \
    # Dont look for yarnrc
    --no-default-rc \
    # All dependencies
    --production=false \
    # Delete old dependencies
    --force \
    # Check cache first
    --prefer-offline

FROM builder_base as common
WORKDIR /usr/pokimane-safety
COPY tsconfig.base.json ./

FROM builder as development
# Git Info
ARG GIT_COMMIT_SHA
ENV GIT_COMMIT_SHA $GIT_COMMIT_SHA
ARG GIT_COMMIT_AUTHOR
ENV GIT_COMMIT_AUTHOR $GIT_COMMIT_AUTHOR
ARG GIT_COMMIT_DATE
ENV GIT_COMMIT_DATE $GIT_COMMIT_DATE
ARG GIT_COMMIT_TITLE
ENV GIT_COMMIT_TITLE $GIT_COMMIT_TITLE
# Copy Common
COPY --from=common /usr/pokimane-safety ./
COPY .eslintrc.js .eslintignore .prettierrc.js .prettierignore .editorconfig .cspell.json tsconfig.eslint.json tsconfig.json ./
CMD echo "override me!"

FROM development
CMD yarn workspace @pokimane-safety/app start
