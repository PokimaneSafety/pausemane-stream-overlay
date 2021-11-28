import { Database } from '../../../database';
import type { IPausemane } from './definition';
import { Pausemane } from './entity';

export interface IPausemaneRepository {
    create(data: Partial<IPausemane>): IPausemane;
    findOne(id: string): Promise<IPausemane | null>;
    save(config: IPausemane): Promise<void>;
    remove(pausemane: IPausemane): Promise<void>;
}

export class PausemaneRepository implements IPausemaneRepository {
    public create(data: Partial<IPausemane>): IPausemane {
        return Database.entityManager.create(Pausemane, data);
    }

    public findOne(id: string): Promise<IPausemane | null> {
        return Database.entityManager.findOne(Pausemane, { id });
    }

    public async save(pausemane: IPausemane): Promise<void> {
        await Database.entityManager.persistAndFlush(pausemane);
    }

    public async remove(pausemane: IPausemane): Promise<void> {
        await Database.entityManager.removeAndFlush(pausemane);
    }
}
