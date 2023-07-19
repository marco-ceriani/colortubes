<script lang="ts">
    import { onMount } from "svelte";

    import ButtonsBar from "../components/ButtonsBar.svelte";
    import Button from "../components/Button.svelte";
    import TubesContainer from "../components/TubesContainer.svelte";
    import EndModal from "../components/EndModal.svelte";

    import {
        GameState,
        GameStatus,
        currentGame,
        randomGame,
    } from "../game/game.js";
    import type { GameMoveRecord } from "../game/game.js";
    import type { ExplorationResult } from "../game/solver"

    import Solver from '../solve-worker?worker'
    let solverWorker: Worker = null;
    let solving: boolean = false;

    let game: GameState = $currentGame;
    let selected: number;
    let moves: GameMoveRecord[] = [];

    let solution: GameMoveRecord[] = [];
    let highlight: number = null;

    onMount(async () => {
        console.log('initializing web worker')
        solverWorker = new Solver()
        solverWorker.onmessage = function(evt: MessageEvent<ExplorationResult>) {
            if (evt.data.result === GameStatus.Won) {
                solution = evt.data.actions
                console.debug(solution)
            }
            solving = false
        }
    })

    function newGame() {
        console.debug("generating new game");
        currentGame.set(randomGame());
        game = $currentGame;
        moves = [];
        solution = [];
        highlight = null;
    }

    function reset() {
        game = $currentGame;
        selected = null;
        moves = [];
        solution = [];
        highlight = null;
    }

    function solve() {
        solverWorker.postMessage(game);
        solving = true;
    }

    function selectTube(evt: CustomEvent<number>) {
        const newIndex: number = evt.detail;
        if (selected === null) {
            selected = newIndex;
            console.debug(`selecting ${selected}`);
        } else if (selected === newIndex) {
            console.debug(`deselecting ${selected}`);
            selected = null;
        } else {
            moveWater(selected, newIndex);
            if (solution.length > 0) {
                const suggestion = solution[0];
                if (
                    newIndex === suggestion.toIndex &&
                    selected === suggestion.fromIndex
                ) {
                    solution = solution.slice(1);
                } else {
                    solution = [];
                }
            }
            selected = null;
            highlight = null;
        }
    }

    function moveWater(from: number, to: number) {
        try {
            const historyEntry = game.historyEntry({ from, to });
            game = game.applyMove({ from, to });
            console.debug(`applied move ${JSON.stringify(historyEntry)}`);
            moves = [...moves, historyEntry];
        } catch (error) {
            console.log(error.message);
        }
    }

    function hint() {
        if (solution.length > 0) {
            selected = solution[0].fromIndex;
            highlight = solution[0].toIndex;
        }
    }
</script>

<ButtonsBar>
    <Button on:click={newGame}>New</Button>
    <Button href="/edit">Custom</Button>
    <Button on:click={reset}>Reset</Button>
    {#if solverWorker && solution.length == 0}
        <Button on:click={solve} spin={solving}>Solve</Button>
    {/if}
    {#if solution.length > 0}
        <Button on:click={hint}>💡</Button>
    {/if}
</ButtonsBar>

<div class="cols-2">
    <TubesContainer tubes={game.tubes} {selected} {highlight} on:select={selectTube} />
</div>

{#if game.ended}
    <EndModal result={game.status == GameStatus.Won} />
{/if}

<style>
    .cols-2 {
        display: grid;
        grid-template-columns: 1fr max-content;
        gap: 1.5rem;
    }
</style>
