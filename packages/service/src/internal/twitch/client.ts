import * as DankTwitchIrc from 'dank-twitch-irc';

interface ICommandContext {
    room: string;
    sender: string;
}

export type CommandCallback = (ctx: ICommandContext) => Promise<void> | void;

export interface ICommandOptions {
    cooldown?: number;
    mod?: boolean;
}

export interface ITwitchClient {
    addCommand(identifier: string, callback: CommandCallback, options?: ICommandOptions): void;
    say(user: string, message: string): Promise<void>;
    connect(): Promise<void>;
    destroy(): void;
}

export interface ITwitchClientConfiguration {
    user: string;
    token: string;
    room: string;
    prefix?: string;
}

interface ICommandStore {
    callback: CommandCallback;
    cooldown?: number;
    lastUsed?: number;
    mod?: boolean;
    executing: boolean;
}

export class TwitchClient implements ITwitchClient {
    protected readonly _client: DankTwitchIrc.ChatClient;
    protected readonly _prefix: string;
    protected readonly _commands = new Map<string, ICommandStore>();

    public constructor(config: Readonly<ITwitchClientConfiguration>) {
        this._prefix = config.prefix ?? '!';
        this._client = new DankTwitchIrc.ChatClient({
            connection: {
                secure: true,
                type: 'tcp',
            },
            ignoreUnhandledPromiseRejections: true,
            installDefaultMixins: true,
            password: config.token,
            rateLimits: 'verifiedBot',
            requestMembershipCapability: false,
            username: config.user,
        });
        this._client.use(new DankTwitchIrc.AlternateMessageModifier(this._client));
        this._client.use(new DankTwitchIrc.SlowModeRateLimiter(this._client));

        this._client.on('ready', () => {
            this._client.join(config.room);
        });

        this._client.on('PRIVMSG', async (message) => {
            const invoker = message.senderUsername;
            const isMod = message.badges.hasBroadcaster || message.badges.hasModerator || message.isMod;

            const parts = message.messageText.split(/\s+/g);
            if (parts.length === 0) {
                return;
            }

            const first = parts[0];
            if (!first.startsWith(this._prefix)) {
                return;
            }

            const commandName = first.slice(this._prefix.length).trim();
            const command = this._commands.get(commandName);
            if (command) {
                if (command.executing) {
                    console.log(`An invocation from ${invoker} was ignored because it is already being executed.`);
                    return;
                }

                if (command.mod && !isMod) {
                    console.log(`An invocation from ${invoker} was ignored because they are not a mod.`);
                    return;
                }

                const now = Date.now();
                if (typeof command.cooldown !== 'undefined' && typeof command.lastUsed !== 'undefined') {
                    const differenceMs = now - command.lastUsed;
                    const differenceSeconds = Math.floor(differenceMs / 1000);
                    const remaning = command.cooldown - differenceSeconds;
                    if (remaning > 0) {
                        console.log(
                            `A pause was attempted by ${message.senderUsername} but it is on cooldown for ${remaning}s`
                        );
                        return;
                    }
                }

                console.log(`Executing command ${commandName} by ${message.senderUsername}`);
                command.executing = true;
                try {
                    await command.callback({ room: message.channelName, sender: invoker });
                } catch (err) {
                    console.error(
                        `An error occurred running the callback for command ${this._prefix}${commandName}: ${
                            (err as Error).stack
                        }`
                    );
                } finally {
                    command.executing = false;
                    command.lastUsed = now;
                }
            }
        });
    }

    public async say(user: string, message: string) {
        await this._client.say(user, message);
    }

    public addCommand(identifier: string, callback: CommandCallback, options?: ICommandOptions) {
        console.log(`Added command ${this._prefix}${identifier}`);
        this._commands.set(identifier, {
            callback,
            cooldown: options?.cooldown,
            executing: false,
            mod: options?.mod,
        });
    }

    public async connect() {
        await this._client.connect();
    }

    public destroy() {
        this._client.destroy();
    }
}
