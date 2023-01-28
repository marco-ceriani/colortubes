import { describe, it, expect, vi } from 'vitest';

import { TreeNode, Wheel } from './solver.js'

function aState(value) {
    const dummy = {
        possibleActions: () => [],
        ended: () => false,
    }
    if (typeof value === 'object') {
        Object.assign(dummy, value)
    } else {
        Object.assign(dummy, {value: value})
    }
    return dummy
}

function aNode(value, parent) {
    return new TreeNode(aState(value), parent)
}

describe('tree logic', () => {
    it('backpropagate', () => {
        const root = aNode('root', null)
        const a1 = aNode('a1', root)
        const a2 = aNode('a2', root)
        const b1 = aNode('b1', a1)
        const b2 = aNode('b2', a1)

        a1.backpropagate(5)
        a2.backpropagate(-3)
        b1.backpropagate(2)
        b2.backpropagate(-1)

        expect(a1.visits).toBe(3)
        expect(a1.reward).toBe(6)
        expect(a2.visits).toBe(1)
        expect(a2.reward).toBe(-3)
    })

    it('terminal check', () => {
        const node1 = aNode({get ended() { return true }})
        expect(node1.isTerminalNode).toBeTruthy()

        const node2 = aNode({get ended() { return false }})
        node2.children.push(aNode('ch'))
        expect(node2.isTerminalNode).toBeFalsy()
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

