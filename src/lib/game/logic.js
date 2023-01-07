
function countTopSibling(tube) {
    if (tube.length < 2) {
        return tube.length;
    }
    const top = tube[tube.length - 1];
    let num = 1;
    while (num < tube.length) {
        if (tube[tube.length - 1 - num] != top) {
            return num;
        }
        num += 1
    }
    return tube.length;
}

export function moveWater(from, to) {
    if (from.empty || from.done) {
        throw Error('source-invalid');
    }
    if (to.full) {
        throw Error('target-full');
    }

    const color = from.topColor;
    if (to.length > 0 && color !== to.topColor) {
        throw Error('invalid-color');
    }

    const numBlocks = Math.min(countTopSibling(from.levels), to.emptySpace);
    const first = from.levels.slice(0, -numBlocks);
    const moved = Array(numBlocks).fill(color);
    const second = [...to.levels, ...moved];
    return [new Tube(from.id, first), new Tube(to.id, second)];
}

export function isGameWon(tubes) {
    return tubes.map(tube => tube.done || tube.length === 0)
        .reduce((a, b) => a && b, true);
}

function ordinal(num) {
    switch (num) {
        case 1:
            return '1st';
        case 2:
            return '2nd';
        case 3:
            return '3rd';
        default:
            return num + 'th';
    }
}

export class Tube {
    constructor(id, levels = []) {
        this.id = id
        this.levels = levels
    }

    get name() {
        return ordinal(this.id + 1)
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
        return this.levels[this.levels.length - 1]
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
}

