import { Tube } from './game/tube'
import { GameState } from './game/game'
import { search_mcts } from './game/solver'

onmessage = (msg: MessageEvent<GameState>) => {
    console.log(`received message`)
    const tubes = msg.data.tubes.map(t => new Tube(t.id, t.levels))
    const game = new GameState(tubes)

    const result = search_mcts(game)

    postMessage(result)
}

