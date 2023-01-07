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
        const tube = new Tube(0, ['wtr1', 'wtr2', 'wtr0', 'wtr4'])
        expect(tube.empty).toBeFalsy()
        expect(tube.full).toBeTruthy()
        expect(tube.done).toBeFalsy()
        expect(tube.emptySpace).toBe(0)
    })

    it('complete tube', () => {
        const tube = new Tube(0, ['wtr1', 'wtr1', 'wtr1', 'wtr1'])
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
        expect(tube.accepts('wtr0')).toBeTruthy()
        expect(tube.accepts('wtr1')).toBeTruthy()
    })

    it ('full tubes accept nothing', () => {
        const tube = new Tube(0, ['wtr0', 'wtr0', 'wtr0', 'wtr0'])
        expect(tube.accepts('wtr1')).toBeFalsy()
        expect(tube.accepts('wtr0')).toBeFalsy()
    })

    it ('half-full tubes accept same color', () => {
        const tube = new Tube(0, ['wtr0'])
        expect(tube.accepts('wtr1')).toBeFalsy()
        expect(tube.accepts('wtr0')).toBeTruthy()
        expect(tube.accepts('wtr0')).toBe(3)
        tube.levels = ['wtr0', 'wtr0']
        expect(tube.accepts('wtr0')).toBe(2)
    })
})
