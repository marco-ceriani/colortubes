import { Tube } from '$lib/game/tube.js'
import { GameState } from '$lib/game/game.js'
import { search_mcts } from '$lib/game/solver.js'

onmessage = (msg) => {
    console.log(`received message`)
    const tubes = msg.data.tubes.map(t => new Tube(t.id, t.levels))
    const game = new GameState(tubes)

    const result = search_mcts(game)

    postMessage(result)
}

