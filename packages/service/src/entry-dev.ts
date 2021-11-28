import * as Constants from 'constants';
import Dotenv from 'dotenv';
import DotenvExpand from 'dotenv-expand';
import * as FS from 'fs';
import * as Path from 'path';

const ENV_FILE_PATH = Path.join(__dirname, '..', '..', '..', '.env');
const DEBUG = false;

console.log(ENV_FILE_PATH);

FS.access(ENV_FILE_PATH, Constants.R_OK, (err) => {
    if (!err) {
        const ENV_FILE_CONTENTS = FS.readFileSync(ENV_FILE_PATH);
        const ENV_VARS = DotenvExpand(Dotenv.parse(ENV_FILE_CONTENTS, { debug: DEBUG }));

        for (const [key, value] of Object.entries(ENV_VARS)) {
            process.env[key] = value as string;
        }
    }

    import('./entry');
});
