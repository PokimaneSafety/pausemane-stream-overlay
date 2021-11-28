import type { IPausemaneRepository } from './model';
import { PausemaneRepository } from './model';

export type PausemaneStoreSubscriber = (count: number) => void;

export interface IPausemaneStore {
    subscribe(subscriber: PausemaneStoreSubscriber): void;
    unsubscribe(subscriber: PausemaneStoreSubscriber): void;
    retrieve(twitchId: string): Promise<number>;
    pause(twitchId: string, increment?: number): Promise<void>;
    reset(twitchId: string): Promise<void>;
}

export interface IPausemaneStoreConfiguration {
    repository?: IPausemaneRepository;
}

export class PausemaneStore implements IPausemaneStore {
    protected _repository: IPausemaneRepository;
    protected _subscribers = new Set<PausemaneStoreSubscriber>();

    public constructor(config?: Readonly<IPausemaneStoreConfiguration>) {
        this._repository = config?.repository ?? new PausemaneRepository();
    }

    public async retrieve(twitchId: string): Promise<number> {
        const pausemane = await this._repository.findOne(twitchId);
        if (!pausemane) {
            throw new Error('Unable to retrieve pause count.');
        }
        return pausemane.pauses;
    }

    public async pause(twitchId: string, increment = 1) {
        let pausemane = await this._repository.findOne(twitchId);
        if (!pausemane) {
            pausemane = this._repository.create({ id: twitchId, pauses: increment });
        } else {
            pausemane.pauses += increment;
        }

        await this._repository.save(pausemane);
        this._subscribers.forEach((subscriber) => subscriber(pausemane!.pauses));
    }

    public async reset(twitchId: string) {
        const pausemane = await this._repository.findOne(twitchId);
        if (!pausemane) {
            throw new Error('Does not exist.');
        }

        await this._repository.remove(pausemane);
        this._subscribers.forEach((subscriber) => subscriber(0));
    }

    public subscribe(subscriber: PausemaneStoreSubscriber) {
        this._subscribers.add(subscriber);
    }

    public unsubscribe(subscriber: PausemaneStoreSubscriber) {
        this._subscribers.delete(subscriber);
    }
}
