export class Random {
    public static RandomInt53(minimum = 0, maximum = Number.MAX_SAFE_INTEGER) {
        minimum = Math.ceil(minimum);
        maximum = Math.floor(maximum);
        const range = maximum - minimum + 1;
        return Math.floor(Math.random() * range) + minimum;
    }
}
