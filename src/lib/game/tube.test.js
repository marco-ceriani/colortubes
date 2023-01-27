import { describe, it, expect } from 'vitest';
import { Tube } from './tube';

describe("tube status", () => {
    it('empty tube', () => {
        const tube = new Tube(0)
        expect(tube.empty).toBeTruthy()
        expect(tube.full).toBeFalsy()
        expect(tube.done).toBeFalsy()
        expect(tube.emptySpace).toBe(4)
        expect(tube.topAmount).toBe(0)
        expect(tube.topColor).toBeNull()
    })

    it('full tube with different colors', () => {
        const tube = new Tube(0, [1, 2, 0, 4])
        expect(tube.empty).toBeFalsy()
        expect(tube.full).toBeTruthy()
        expect(tube.done).toBeFalsy()
        expect(tube.emptySpace).toBe(0)
        expect(tube.topColor).toBe(4)
        expect(tube.topAmount).toBe(1)
        expect(tube.singleColor).toBeFalsy()
    })

    it('complete tube', () => {
        const tube = new Tube(0, [1, 1, 1, 1])
        expect(tube.empty).toBeFalsy()
        expect(tube.full).toBeTruthy()
        expect(tube.done).toBeTruthy()
        expect(tube.emptySpace).toBe(0)
        expect(tube.topColor).toBe(1)
        expect(tube.topAmount).toBe(4)
        expect(tube.singleColor).toBeTruthy()
    })

    it('one level', () => {
        const tube = new Tube(0, [3])
        expect(tube.empty).toBeFalsy()
        expect(tube.full).toBeFalsy()
        expect(tube.done).toBeFalsy()
        expect(tube.emptySpace).toBe(3)
        expect(tube.topColor).toBe(3)
        expect(tube.topAmount).toBe(1)
        expect(tube.singleColor).toBeTruthy()
    })

    it('two levels equal', () => {
        const tube = new Tube(0, [2, 2])
        expect(tube.empty).toBeFalsy()
        expect(tube.full).toBeFalsy()
        expect(tube.done).toBeFalsy()
        expect(tube.emptySpace).toBe(2)
        expect(tube.topColor).toBe(2)
        expect(tube.topAmount).toBe(2)
        expect(tube.singleColor).toBeTruthy()
    })
})

/*describe('moving water', () => {

})*/

describe('test accepts color', () => {
    it ('empty tubes accept anything', () => {
        const tube = new Tube(0)
        expect(tube.accepts(0)).toBeTruthy()
        expect(tube.accepts(1)).toBeTruthy()
    })

    it ('full tubes accept nothing', () => {
        const tube = new Tube(0, [0, 0, 0, 0])
        expect(tube.accepts(1)).toBeFalsy()
        expect(tube.accepts(0)).toBeFalsy()
    })

    it ('half-full tubes accept same color', () => {
        const tube = new Tube(0, [0])
        expect(tube.accepts(1)).toBeFalsy()
        expect(tube.accepts(0)).toBeTruthy()
        expect(tube.accepts(0)).toBe(3)
        tube.levels = [0, 0]
        expect(tube.accepts(0)).toBe(2)
    })
})
