

import { GameState } from "$lib/game/game.js"

export class TreeNode {
    constructor(state, parent, action) {
        this.state = state
        this.action = action
        this.unevaluatedActions = state.possibleActions()

        this.parent = parent
        this.children = []
        this.visits = 0
        this.value = 0
    }

    backpropagate(value) {
        this.visits++
        this.value += value
        if (this.parent) {
            this.parent.backpropagate(value)
        }
    }

    get isTerminalNode() {
        return this.state.ended
    }

    // tune the formula
    getUpperConfidenceBound() {
        if (this.visits === 0) return Infinity
        return (this.wins / this.visits) + Math.sqrt(2 * Math.log(this.parent.visits) / this.visits)
    }

    getRandomUnvisited() {
        return this.children[0]
    }

    get hasChildren() {
        return this.children.length !== 0
    }

    get fullyExpanded() {
        return this.children.map(c => c.visits > 0)
            .reduce((a, b) => a && b, true);
    }

    expand() {
        const action = this.unevaluatedActions.pop()
        console.debug(`apply ${action}`)
        const nextState = this.state.applyMove(action)
        const nextNode = new TreeNode(nextState, this, action)
        self.children.push(nextNode)
        return nextNode
    }
}

/**
 * Searches for a solution using the Monte Carlo Tree Search algorithm
 * @param {state} the initial state
 */
export function search_mcts(state) {
    const root = new TreeNode(state, null)
    const iterations = 5
    
    let bestResult = -Infinity
    let bestActions = []

    for (let i = 0; i < iterations; i++) {
        const leaf = traverse(root)
        const [finalState, actions] = rollout(leaf.state)
        const simulationResult = evaluate(finalState)
        console.debug(`run result ${simulationResult}`)
        leaf.backpropagate(simulationResult)
        if (simulationResult > bestResult) {
            bestActions = actions
            bestResult = simulationResult
        }
    }

    return bestActions
}

function traverse(root) {
    let current = root
    // while (!current.terminalNode) {
    //     if (current.fullyExpanded) {
    //         current = current.bestChild()
    //     }
    //     current = best_uct(current)
    // }
    // return current.getRandomUnvisited() || current
    return root
}

function rolloutPolicy(moves) {
    return moves[Math.floor(Math.random() * moves.length)]
}

function rollout(game, maxSteps = 20) {
    const movesSequence = []
    let currState = game
    for (let i = 0; !currState.ended && i < maxSteps; i++) {
        const moves = currState.possibleActions();
        const move = rolloutPolicy(moves)
        movesSequence.push(currState.historyEntry(move))
        currState = currState.applyMove(move)
    }
    return [currState, movesSequence]
}

function evaluate(state) {
    if (state.won) {
        return 100
    }
    if (state.lost) {
        return -100
    }
    return state.numClosed
}

