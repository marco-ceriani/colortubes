import { describe, it, expect, vi } from 'vitest';

import { TreeNode } from './solver.js'

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


