

const C_PARAM = 2 // theoretically 1.415

function useless(state, action) {
    const fromTube = state.tubes[action.from]
    const toTube = state.tubes[action.to]
    if (fromTube.singleColor && toTube.empty) {
        return true
    }
    return false
}

export class TreeNode {
    constructor(state, parent, action) {
        this.state = state
        this.action = action
        this.unevaluatedActions = state.possibleActions().filter(a => !useless(state, a))

        this.parent = parent
        this.children = []
        this.visits = 0
        this.reward = 0
    }

    get isTerminalNode() {
        return this.state.ended || (this.unevaluatedActions.length === 0 && this.children.length === 0)
    }

    get fullyExpanded() {
        return this.unevaluatedActions.length === 0
    }

    bestChild() {
        let bestValue = -Infinity
        let bestChild = null
        for (const child of this.children) {
            const uct = child.getUpperConfidenceBound()
            if (uct > bestValue) {
                bestChild = child
                bestValue = uct
            }
        }
        if (!bestChild) {
            console.error('invalid child')
        }
        return bestChild
    }

    // tune the formula
    getUpperConfidenceBound() {
        if (this.visits === 0) return Infinity
        return (this.reward / this.visits) + C_PARAM * Math.sqrt( Math.log(this.parent.visits) / this.visits)
    }

    expand() {
        const action = this.unevaluatedActions.pop()
        const actionRecord = this.state.historyEntry(action)
        const nextState = this.state.applyMove(action)
        const nextNode = new TreeNode(nextState, this, actionRecord)
        this.children.push(nextNode)
        return nextNode
    }

    backpropagate(value) {
        this.visits++
        this.reward += value
        if (this.parent) {
            this.parent.backpropagate(value)
        }
    }
}

/**
 * Searches for a solution using the Monte Carlo Tree Search algorithm
 * @param {state} the initial state
 */
export function search_mcts(state) {
    const root = new TreeNode(state, null)
    const iterations = 1000
    const maxRollout = 50
    
    let bestResult = undefined
    let bestReward = -Infinity
    let bestActions = []

    const startTime = new Date().valueOf();
    let counter = 0;

    while (new Date().valueOf() - startTime < 1000) {
        const [leaf, preActions] = traverse(root)
        const [finalState, rolloutActions] = rollout(leaf.state, maxRollout)
        const actions = preActions.concat(rolloutActions)
        const simulationReward = evaluate(finalState, actions)
        console.debug(`run result ${simulationReward}`)
        leaf.backpropagate(simulationReward)
        if (simulationReward > bestReward) {
            bestActions = actions
            bestReward = simulationReward
            bestResult = finalState.status
        }
        counter++
    }

    console.info(`best result: ${bestResult} with value ${bestReward.toFixed(2)} after ${counter} iterations`)
    return {
        result: bestResult,
        actions: bestActions
    }
}

function traverse(root) {
    let current = root
    const actions = []
    while (!current.isTerminalNode) {
        if (current.fullyExpanded) {
            current = current.bestChild()
            actions.push(current.action)
        } else {
            current = current.expand()
            actions.push(current.action)
            break
        }
    }
    return [current, actions]
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

function evaluate(state, actionsList) {
    if (state.won) {
        return 50.0 / actionsList.length
    } else if (state.lost) {
        return 0
    }
    return ((1.0 * state.numClosed) / state.tubes.length)
}

