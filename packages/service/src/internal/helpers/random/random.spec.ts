import { Random } from './random';

describe('Helpers', () => {
    describe('Random', () => {
        describe(Random.RandomInt53.name, () => {
            it('Should produce a random number between 0 and 10 inclusive', () => {
                const minimum = 10;
                const maximum = 50;

                for (let i = 0; i < 100; i++) {
                    const result = Random.RandomInt53(minimum, maximum);
                    expect(result).not.toBeLessThan(minimum);
                    expect(result).not.toBeGreaterThan(maximum);
                }
            });

            it('Should not follow an arithmetic or geometric sequence', () => {
                const tolerance = 0.95;
                const runs = 100;

                const seen = new Set<number>();

                let last = Random.RandomInt53();
                for (let i = 0; i < runs; i++) {
                    const result = Random.RandomInt53();
                    const multiplier = i % 2 === 0 ? -1 : 1;
                    const difference = multiplier * last - result;
                    if (!seen.has(difference)) {
                        seen.add(difference);
                    }
                    last = result;
                }

                expect(seen.size).toBeGreaterThanOrEqual(runs * tolerance);
            });
        });
    });
});
