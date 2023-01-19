import { moveWater, Tube } from './tube';
import { writable } from 'svelte/store';

function getActions(tubes) {
    let actions = []
    for (let i = 0; i < tubes.length; i++) {
        const source = tubes[i];
        if (!source.done && !source.empty) {
            for (let j = 0; j < tubes.length; j++) {
                const dest = tubes[j]
                if (i !== j && dest.accepts(source.topColor)) {
                    actions.push({
                        from: source.id,
                        to: dest.id
                    })
                }
            }
        }
    }
    return actions;
}

function isGameWon(tubes) {
    return tubes.map(tube => tube.done || tube.empty)
        .reduce((a, b) => a && b, true);
}

export class GameState {
    constructor(tubes = []) {
        this.tubes = []
        for (const [i, t] of tubes.entries()) {
            if (t instanceof Tube) {
                this.tubes.push(t)
            } else {
                this.tubes.push(new Tube(i, t))
            }
        }
        if (isGameWon(this.tubes)) {
            this.status = 'win'
        } else if (this.possibleActions().length === 0) {
            this.status = 'lose'
        }
    }

    possibleActions() {
        return getActions(this.tubes)
    }

    get won() {
        return this.status === 'win'
    }

    get lost() {
        return this.status === 'lose'
    }

    get ended() {
        return this.status !== undefined
    }

    get numClosed() {
        return this.tubes.filter(tube => tube.done).length
    }

    historyEntry({ from, to }) {
        if (this.tubes[from].topColor !== this.tubes[to].topColor && !this.tubes[to].empty) {
            throw new Error('invalid-color')
        }
        const color = this.tubes[from].topColor
        return {
            fromIndex: from,
            toIndex: to,
            fromId: this.tubes[from].name,
            toId: this.tubes[to].name,
            color: color,
            amount: Math.min(this.tubes[from].topAmount, this.tubes[to].accepts(color))
        }
    }

    applyMove({from, to}) {
        const [newSourceTube, newDestTube] = moveWater(this.tubes[from], this.tubes[to]);
        const newTubes = [...this.tubes]
        newTubes[from] = newSourceTube
        newTubes[to] = newDestTube
        return new GameState(newTubes);
    }

    add(color, to) {
        const newTubes = [...this.tubes]
        newTubes[to] = this.tubes[to].add(color)
        return new GameState(newTubes);
    }

    // async getHash() {
    //     const nums = []
    //     for (const tube of this.tubes) {
    //         nums.push(...tube.levels.map(v => Number(v.slice(3))))
    //         if (!tube.full) {
    //             nums.push(-1)
    //         }
    //     }
    //     const bytes = new Uint8Array(nums)
    //     const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
    //     const hashArray = Array.from(new Uint8Array(hashBuffer));
    //     const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    //     return hashHex
    // }
}

export const currentGame = writable([
    [9, 8, 5, 2],
    [1, 3, 3, 3],
    [6, 5, 8, 5],
    [7, 6, 2, 9],
    [9, 6, 8, 7],
    [7, 6, 4, 3],

    [2, 1, 8, 5],
    [1, 4, 9, 4],
    [1, 7, 2, 4],
    [],
    []
])

