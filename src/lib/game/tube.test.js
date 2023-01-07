import { describe, it, expect } from 'vitest';
import { Tube } from './logic';

describe("tube status", () => {
    it('empty tube', () => {
        const tube = new Tube(0)
        expect(tube.empty).toBeTruthy()
        expect(tube.full).toBeFalsy()
        expect(tube.done).toBeFalsy()
        expect(tube.emptySpace).toBe(4)
    })

    it('full tube with different colors', () => {
        const tube = new Tube(0, [1, 2, 3, 4])
        expect(tube.empty).toBeFalsy()
        expect(tube.full).toBeTruthy()
        expect(tube.done).toBeFalsy()
        expect(tube.emptySpace).toBe(0)
    })

    it('complete tube', () => {
        const tube = new Tube(0, [1, 1, 1, 1])
        expect(tube.empty).toBeFalsy()
        expect(tube.full).toBeTruthy()
        expect(tube.done).toBeTruthy()
        expect(tube.emptySpace).toBe(0)
    })
})

/*describe('moving water', () => {

})*/

describe('basic logic', () => {
    it ('empty tubes accept anything', () => {
        const tube = new Tube(0)
        expect(tube.accepts('red')).toBeTruthy()
        expect(tube.accepts('blue')).toBeTruthy()
    })

    it ('full tubes accept nothing', () => {
        const tube = new Tube(0, ['red', 'red', 'red', 'red'])
        expect(tube.accepts('blue')).toBeFalsy()
        expect(tube.accepts('red')).toBeFalsy()
    })

    it ('half-full tubes accept same color', () => {
        const tube = new Tube(0, ['red'])
        expect(tube.accepts('blue')).toBeFalsy()
        expect(tube.accepts('red')).toBeTruthy()
        expect(tube.accepts('red')).toBe(3)
        tube.levels = ['red', 'red']
        expect(tube.accepts('red')).toBe(2)
    })
})
