
export function amountMovable(from, to) {
    if (from.empty) {
        return 0;
    }
    if (to.empty || from.topColor === to.topColor) {
        return Math.min(from.topAmount, to.emptySpace);
    }
    return 0;
}

export function moveWater(from, to) {
    if (from.empty) {
        throw Error(`source-empty ${from.name}`);
    }
    if (from.done) {
        throw Error(`source-closed ${from.name}`);
    }
    if (to.full) {
        throw Error(`target-full ${from.name}`);
    }

    const color = from.topColor;
    if (to.length > 0 && color !== to.topColor) {
        throw Error('invalid-color');
    }

    const numBlocks = Math.min(from.topAmount, to.emptySpace);
    const first = from.levels.slice(0, -numBlocks);
    const moved = Array(numBlocks).fill(color);
    const second = [...to.levels, ...moved];
    return [new Tube(from.id, first), new Tube(to.id, second)];
}

export function isGameWon(tubes) {
    return tubes.map(tube => tube.done || tube.length === 0)
        .reduce((a, b) => a && b, true);
}

export class Tube {
    constructor(id, levels = []) {
        this.id = id
        this.levels = levels
    }

    get name() {
        return String.fromCharCode(65 + this.id)
    }

    get empty() {
        return this.levels.length === 0;
    }

    get full() {
        return this.levels.length >= 4;
    }

    get emptySpace() {
        return 4 - this.levels.length;
    }

    get done() {
        return this.levels.length === 4 &&
            this.levels[0] === this.levels[1] &&
            this.levels[1] === this.levels[2] &&
            this.levels[2] == this.levels[3];
    }

    get topColor() {
        if (this.levels.length) {
            return this.levels[this.levels.length - 1]
        } else {
            return null;
        }
    }

    get topAmount() {
        if (this.levels.length <= 1) {
            return this.levels.length
        }
        const top = this.topColor
        let num = 1;
        while (num < this.levels.length) {
            if (this.levels[this.levels.length - 1 - num] != top) {
                return num;
            }
            num += 1
        }
        return this.levels.length;
    }

    accepts(color) {
        if (this.empty) {
            return 4;
        }
        if (this.full) {
            return 0;
        }
        if (this.topColor === color) {
            return this.emptySpace;
        } else {
            return 0;
        }
    }

    add(color) {
        if (!this.full) {
            return new Tube(this.id, [...this.levels, color])
        }
    }
}

