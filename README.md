# Pausemane Stream Overlay

This repository is the home to an overlay created for Pokimane to track the amount of pauses issued while reacting to digital media.

The project is setup as a Typescript monorepo with Lerna and Yarn workspaces. The overlay is a React app deployed as a static website via Cloudflare with an S3 backend. The app connects to a WebSocket backend hosted on a Kubernetes cluster. Dockerfiles and Helm charts are included.

<!-- TOC depthFrom:2 -->

-   [1. Installation](#1-installation)
    -   [1.1 Installing Dependencies](#11-installing-dependencies)
    -   [1.2 Configure Environment](#12-configure-environment)
-   [2. Development](#2-development)
    -   [2.1 Development Commands](#21-development-commands)
    -   [2.2 Testing](#22-testing)
-   [3. Deploying to Production](#3-deploying-to-production)
    -   [3.1 Requirements](#31-requirements)
    -   [3.2 Production Configuration](#32-production-configuration)
    -   [3.3 Production Infrastructure](#33-production-infrastructure)
    -   [3.4 Deploying the Chart](#34-deploying-the-chart)
    -   [3.5 Final Notes](#35-final-notes)

<!-- /TOC -->

## 1. Installation

You will need:

-   Git
-   Yarn (Classic)
-   Node (Nodenv is recommended, 16.X is fine though)

To run the overlay locally first clone the repository and navigate into the directory.

```bash
git clone https://github.com/PokimaneSafety/pausemane-stream-overlay.git
cd pausemane-stream-overlay
```

### 1.1 Installing Dependencies

Next, install the dependencies:

```bash
yarn install
```

Installation hooks will automatically setup git hooks and link packages together. Module hoisting is performed by yarn workspaces at this stage.

### 1.2 Configure Environment

Next, configure your environment. You can do so by copying the example environment file.

```bash
cp .env.example .env
```

Then edit the file in your text editor.

```bash
eval "$EDITOR" .env
```

Finally, start the app and backend simultaneously by executing the `yarn start` command. You can alternatively run them in docker by executing `yarn start:docker`. If using the docker method local production dependencies are not required but developer dependencies are still needed.

## 2. Development

If you wish to contribute to this repository please fork it and make a pull request. If you are a serious contributor I highly recommend running everything in Docker. Hot-reload will work there as volume mounts are provided in the docker-compose file as read-only mounts. Below I will document useful project root commands.

### 2.1 Development Commands

| Command             | Description                                                                            |
| ------------------- | -------------------------------------------------------------------------------------- |
| **`addlocal`**      | Adds a local package to another local package.                                         |
| **`ws`**            | Shorthand for `yarn workspace @pokimane-safety/$1`.                                    |
| **`start`**         | Starts `app` and `service` in parallel with hot-reloading.                             |
| **`start:docker`**  | The same as the `start` command but in Docker.                                         |
| **`build`**         | Compiles all packages.                                                                 |
| **`build:docker`**  | Builds all docker images.                                                              |
| **`typecheck`**     | Executes a fast-pass check for type-completeness in all packages.                      |
| **`clean`**         | Removes node_modules, build output, coverage dumps, caches and log files.              |
| **`lint`**          | Checks for linting errors throughout the entire project. This calls format internally. |
| **`lint:fix`**      | Fixes lint errors where possible throughout the entire project.                        |
| **`format`**        | Checks for spelling errors throughout the entire project.                              |
| **`format:fix`**    | Fixes formatting errors where possible throughout the entire project.                  |
| **`spelling`**      | Checks for spelling errors throughout the entire project.                              |
| **`test`**          | Executes the test runner for all packages.                                             |
| **`test:coverage`** | Executes the test runner for all packages specifying coverage should be generated.     |
| **`chart:lint`**    | Lints the Kubernetes [chart](./chart) using `helmfile`.                                |
| **`chart:render`**  | Renders the Kubernetes [chart](./chart) using `helmfile` (debug).                      |
| **`tf:plan`**       | Generates a plan of operations to commit across all packages.                          |
| **`tf:apply`**      | Applies terraform operations across all packages.                                      |
| **`tf:output`**     | Retrieves a terraform output, or all if a key is not specified.                        |
| **`tf:destroy`**    | Destroys all terraform infrastructure for all packages.                                |

You can edit source code or your .env file and have hot-reloads execute in real time with the local and docker build approaches.

### 2.2 Testing

If you wish to run tests you can execute `yarn test:coverage`. If you use VS Code for your IDE you will be recommended a coverage gutters extension which will watch the coverage output and highlight the implementation code with green, yellow or red to build more robust tests. If you plan to contribute tests I recommend running `yarn test:coverage --watch` to make your life easier.

## 3. Deploying to Production

To deploy to production you should fork this repository and configure your own GitHub secrets if you wish to have automated CI/CD. Otherwise you can manually push your Docker images and invalidate the Cloudflare cache through their REST API or Web UI.

### 3.1 Requirements

If you wish to deploy this yourself, you should install:

-   `terraform`
-   `helm`
-   `helmfile`
-   `kubectl`

### 3.2 Production Configuration

First you should create `terraform.tfvars` files in the [**`app`**](./packages/app) and [**`service`**](./packages/service) terraform directories to define their respective variables defined in the `variables.tf` file.

### 3.3 Production Infrastructure

Next, you should execute `yarn tf:plan` to review the resources terraform will generate. If you are happy with it you should execute `yarn tf:apply`. This will take a few moments but will generate the resources required to store the service docker image and hold the static build output produced by the app.

### 3.4 Deploying the Chart

Next, you will need to retrieve the context for your Kubernetes cluster. Once you have this you can deploy the chart by executing `helmfile apply`. It is recommended you install the helmfile diff plugin for updating manifests as this repository grows.

### 3.5 Final Notes

This is a brief deployment introduction with a minor audience - more details will be added in the future.
