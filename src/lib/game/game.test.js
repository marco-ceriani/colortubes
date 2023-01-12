import { describe, it, expect } from 'vitest';
import { Tube } from './tube';
import { GameState } from './game';

describe('listing next actions', () => {
    it('any color to empty', () => {
        const state = new GameState([
            new Tube(0, ['wtr0', 'wtr0', 'wtr1', 'wtr1']),
            new Tube(1, []),
            new Tube(2, ['wtr0', 'wtr0', 'wtr2', 'wtr2'])
        ])
        const actions = state.possibleActions()
        expect(actions.length).toBe(2)
        expect(actions[0]).toEqual({ from: 0, to: 1 })
        expect(actions[1]).toEqual({ from: 2, to: 1 })
    })

    it('full to same color, not opposite', () => {
        const state = new GameState([
            new Tube(0, ['wtr0', 'wtr0', 'wtr1', 'wtr1']),
            new Tube(1, ['wtr1'])
        ])
        const actions = state.possibleActions()
        expect(actions.length).toBe(1)
        expect(actions[0]).toEqual({ from: 0, to: 1 })
        expect(actions).toEqual(expect.not.arrayContaining([{ from: 1, to: 0 }]))
    })

    it('to same color', () => {
        const state = new GameState([
            new Tube(1, ['wtr1']),
            new Tube(2, ['wtr2', 'wtr2', 'wtr2']),
            new Tube(3, ['wtr0', 'wtr0', 'wtr1'])
        ])
        const actions = state.possibleActions()
        expect(actions).toEqual(
            expect.arrayContaining([{ from: 1, to: 3 }, { from: 3, to: 1 }])
        )
        expect(actions.length).toBe(2)
    })

    it('no moves', () => {
        const state = new GameState([
            new Tube(0, ['wtr0', 'wtr1', 'wtr1', 'wtr2']),
            new Tube(1, ['wtr1', 'wtr0', 'wtr0', 'wtr2']),
            new Tube(2, ['wtr0']),
            new Tube(3, ['wtr1'])
        ])
        const actions = state.possibleActions()
        expect(actions.length).toBe(0)
    })

    // this is useless, but a similar one is actually good
    // it('useless moves', () => {
    //     const state = new GameState([
    //         new Tube(0, ['wtr0', 'wtr0', 'wtr1', 'wtr2']),
    //         new Tube(1, ['wtr1', 'wtr2', 'wtr2']),
    //         new Tube(2, ['wtr0', 'wtr0']),
    //         new Tube(3, ['wtr1', 'wtr1', 'wtr2'])
    //     ])
    //     const actions = state.possibleActions()
    //     expect(actions).toEqual([])
    //     expect(actions.length).toBe(0)
    // })
})

describe('test won condition', () => {
    it('won game', () => {
        const state = new GameState([
            new Tube(1, ['wtr1', 'wtr1', 'wtr1', 'wtr1']),
            new Tube(2, ['wtr2', 'wtr2', 'wtr2', 'wtr2']),
            new Tube(3, [])
        ])
        expect(state.won).toBeTruthy()
        expect(state.lost).toBeFalsy()
        expect(state.ended).toBeTruthy()
    })

    it('ongoing game', () => {
        const state = new GameState([
            new Tube(1, ['wtr1', 'wtr1', 'wtr1', 'wtr2']),
            new Tube(2, ['wtr2', 'wtr2', 'wtr2', 'wtr1']),
            new Tube(3, [])
        ])
        expect(state.won).toBeFalsy()
        expect(state.lost).toBeFalsy()
        expect(state.ended).toBeFalsy()
    })

    it('lost game', () => {
        const state = new GameState([
            new Tube(0, ['wtr0', 'wtr1', 'wtr1', 'wtr2']),
            new Tube(1, ['wtr1', 'wtr0', 'wtr0', 'wtr2']),
            new Tube(2, ['wtr0']),
            new Tube(3, ['wtr1'])
        ])
        expect(state.won).toBeFalsy()
        expect(state.lost).toBeTruthy()
        expect(state.ended).toBeTruthy()
    })
})
