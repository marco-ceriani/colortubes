import type { GameState, GameMove, GameMoveRecord } from './game'
import { GameStatus, isMoveGood } from './game'

const C_PARAM = 2 // theoretically 1.415

export type ExplorationResult = {
    result: GameStatus,
    actions: GameMoveRecord[]
}

function goodActions(state: GameState, prevAction?: GameMoveRecord): GameMove[] {
    const legalActions = state.possibleActions()

    return legalActions.filter(a => isMoveGood(state, a))
}

export class TreeNode {
    readonly state: GameState
    readonly action: GameMoveRecord
    private unevaluatedActions: GameMove[]

    private parent: TreeNode
    private children: TreeNode[]
    private visits: number
    private reward: number

    constructor(state: GameState, parent: TreeNode, action: GameMoveRecord) {
        this.state = state
        this.action = action
        this.unevaluatedActions = goodActions(state, action)

        this.parent = parent
        this.children = []
        this.visits = 0
        this.reward = 0
    }

    get isTerminalNode(): boolean {
        return this.state.ended || (this.unevaluatedActions.length === 0 && this.children.length === 0)
    }

    get fullyExpanded(): boolean {
        return this.unevaluatedActions.length === 0
    }

    bestChild(): TreeNode | null {
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
    getUpperConfidenceBound(): number {
        if (this.visits === 0) return Infinity
        return (this.reward / this.visits) + C_PARAM * Math.sqrt(Math.log(this.parent.visits) / this.visits)
    }

    expand(): TreeNode {
        const action = this.unevaluatedActions.pop()
        const actionRecord = this.state.historyEntry(action)
        const nextState = this.state.applyMove(action)
        const nextNode = new TreeNode(nextState, this, actionRecord)
        this.children.push(nextNode)
        return nextNode
    }

    backpropagate(value: number): void {
        this.visits++
        this.reward += value
        if (this.parent) {
            this.parent.backpropagate(value)
        }
    }
}

/**
 * Searches for a solution using the Monte Carlo Tree Search algorithm
 * @param {GameState} state     the initial state
 */
export function search_mcts(state: GameState): ExplorationResult {
    const root = new TreeNode(state, null, null)
    const maxRollout = 10 + state.tubes.length * 4

    let bestResult: GameStatus = GameStatus.Playing
    let bestReward = -Infinity
    let bestActions: GameMoveRecord[] = []
    let bestElapsed: number = 0

    const startTime = new Date().valueOf();
    let counter = 0;

    let elapsed = 0
    while (elapsed < 300 || bestResult !== GameStatus.Won && elapsed < 5000) {
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
            bestElapsed = elapsed
        }
        counter++
        elapsed = new Date().valueOf() - startTime
    }

    console.info(`best result: ${GameStatus[bestResult]} with value ${bestReward.toFixed(2)} in ${bestElapsed}ms`)
    console.info(`total exploration: ${counter} iterations ${elapsed}ms)`)
    return {
        result: bestResult,
        actions: bestActions
    }
}

function traverse(root: TreeNode): [TreeNode, GameMoveRecord[]] {
    let current = root
    const actions: GameMoveRecord[] = []
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

function rolloutPolicy(moves: GameMove[]): GameMove {
    return moves[Math.floor(Math.random() * moves.length)]
}

function rollout(game: GameState, maxSteps = 20): [GameState, GameMoveRecord[]] {
    const movesSequence: GameMoveRecord[] = []
    let currState = game
    for (let i = 0; !currState.ended && i < maxSteps; i++) {
        const moves = goodActions(currState)
        const move = rolloutPolicy(moves)
        movesSequence.push(currState.historyEntry(move))
        currState = currState.applyMove(move)
    }
    return [currState, movesSequence]
}

function evaluate(state: GameState, actionsList: GameMoveRecord[]) {
    if (state.won) {
        return 1.0 / (1.0 + actionsList.length / 50.0)
    } else if (state.lost) {
        return 0
    }
    return ((1.0 * state.numClosed) / state.tubes.length)
}

