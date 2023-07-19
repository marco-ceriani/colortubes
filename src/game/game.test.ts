import { describe, it, expect } from 'vitest';
import { Tube } from './tube';
import { GameState, Wheel } from './game';

describe('listing next actions', () => {
    it('any color to empty', () => {
        const state = new GameState([
            new Tube(0, [0, 0, 1, 1]),
            new Tube(1, []),
            new Tube(2, [0, 0, 2, 2])
        ])
        const actions = state.possibleActions()
        expect(actions.length).toBe(2)
        expect(actions[0]).toEqual({ from: 0, to: 1 })
        expect(actions[1]).toEqual({ from: 2, to: 1 })
    })

    it('full to same color, not opposite', () => {
        const state = new GameState([
            new Tube(0, [0, 0, 1, 1]),
            new Tube(1, [1])
        ])
        const actions = state.possibleActions()
        expect(actions.length).toBe(1)
        expect(actions[0]).toEqual({ from: 0, to: 1 })
        expect(actions).toEqual(expect.not.arrayContaining([{ from: 1, to: 0 }]))
    })

    it('to same color', () => {
        const state = new GameState([
            new Tube(1, [1]),
            new Tube(2, [2, 2, 2]),
            new Tube(3, [0, 0, 1])
        ])
        const actions = state.possibleActions()
        expect(actions).toEqual(
            expect.arrayContaining([{ from: 1, to: 3 }, { from: 3, to: 1 }])
        )
        expect(actions.length).toBe(2)
    })

    it('no moves', () => {
        const state = new GameState([
            new Tube(0, [0, 1, 1, 2]),
            new Tube(1, [1, 0, 0, 2]),
            new Tube(2, [0]),
            new Tube(3, [1])
        ])
        const actions = state.possibleActions()
        expect(actions.length).toBe(0)
    })
})

describe('test won condition', () => {
    it('won game', () => {
        const state = new GameState([
            new Tube(1, [1, 1, 1, 1]),
            new Tube(2, [2, 2, 2, 2]),
            new Tube(3, [])
        ])
        expect(state.won).toBeTruthy()
        expect(state.lost).toBeFalsy()
        expect(state.ended).toBeTruthy()
    })

    it('ongoing game', () => {
        const state = new GameState([
            new Tube(1, [1, 1, 1, 2]),
            new Tube(2, [2, 2, 2, 1]),
            new Tube(3, [])
        ])
        expect(state.won).toBeFalsy()
        expect(state.lost).toBeFalsy()
        expect(state.ended).toBeFalsy()
    })

    it('lost game', () => {
        const state = new GameState([
            new Tube(0, [0, 1, 1, 2]),
            new Tube(1, [1, 0, 0, 2]),
            new Tube(2, [0]),
            new Tube(3, [1])
        ])
        expect(state.won).toBeFalsy()
        expect(state.lost).toBeTruthy()
        expect(state.ended).toBeTruthy()
    })
})

describe('random wheel', () => {
    const items = ['a', 'b', 'c', 'd', 'e']
    const wheel = new Wheel(items, [.1, .1, .3, 0, .5])
    const results = {}
    const iterations = 10_000
    for (let i = 0; i < 10_000; i++) {
        const item = wheel.randomItem()
        results[item] = (results[item] || 0) + 1
    }
    for (const item of items) {
        results[item] = (results[item] || 0) / iterations
    }
    it('results distribution are close to weight', () => {
        console.log(results)
        expect(results['a']).toBeCloseTo(.1, 1)
        expect(results['b']).toBeCloseTo(.1, 1)
        expect(results['c']).toBeCloseTo(.3, 1)
        expect(results['d']).toBe(0)
        expect(results['e']).toBeCloseTo(.5, 1)
    })
})
