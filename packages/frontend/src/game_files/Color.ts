class Color {
    private readonly red: number;
    private readonly green: number;
    private readonly blue: number;
    static fromHex(color: string): Color {
        if (
            !color.search('#') ||
            color.length != 7
        ) {
            throw new Error('Invalid color');
        }
        return new Color(
            parseInt(color.substring(1, 2), 16),
            parseInt(color.substring(3, 4), 16),
            parseInt(color.substring(5, 6), 16)
        );
    }
    constructor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
    public getRed(): number {
        return this.red;
    }
    public getGreen(): number {
        return this.green;
    }
    public getBlue(): number {
        return this.blue;
    }
    public toHex(): string {
        return (
            '#' +
            this.red.toString(16) +
            this.green.toString(16) +
            this.blue.toString(16)
        );
    }
}

export default { Color };
