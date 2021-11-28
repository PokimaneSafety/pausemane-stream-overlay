import { Entity, Index, PrimaryKey, Property, Unique } from '@mikro-orm/core';

import type { IPausemane } from './definition';

@Entity()
export class Pausemane implements IPausemane {
    @PrimaryKey()
    @Index()
    @Unique()
    public readonly id!: string;

    @Property()
    public pauses!: number;
}
