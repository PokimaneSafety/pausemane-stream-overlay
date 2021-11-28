#!/usr/bin/env node
const { spawn } = require('child_process');
const { constants } = require('os');

const runtime = spawn(
    'docker-compose',
    String.raw`up --remove-orphans --build pausemane-stream-overlay-service`.split(' '),
    { stdio: ['ignore', 'inherit', 'inherit'] }
);

let isClosing = false;
const close = () => {
    if (isClosing) {
        return;
    }
    isClosing = true;
    runtime.once('close', () => process.exit(0));
    runtime.kill(constants.signals.SIGINT);
};

process.once('SIGINT', close);
process.once('SIGTERM', close);
