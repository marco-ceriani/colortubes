<script lang="ts">
    import { onMount } from "svelte";

    import ButtonsBar from "../components/ButtonsBar.svelte";
    import Button from "../components/Button.svelte";
    import TubesContainer from "../components/TubesContainer.svelte";
    import EndModal from "../components/EndModal.svelte";
    import PageFocus from "../components/PageFocus.svelte"
    import type { TubeClick, TubeDrag, TubeDragDrop } from "../components/events"

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
    let selected: number = null;
    let moves: GameMoveRecord[] = [];
    let tubesEnabled: boolean[] = [];

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
        reset();
    }

    function reset() {
        game = $currentGame;
        selected = null;
        highlight = null;
        moves = [];
        solution = [];
        updateSelectableState()
    }

    function solve() {
        solverWorker.postMessage(game);
        solving = true;
    }

    function isSelectable(id: number) {
		if (selected === id) {
			return true;
		}
		if (game.tubes[id].done) {
			return false;
		}
		if (selected === null && game.tubes[id].empty) {
			return false;
		}
		if (selected !== null && game.tubes[id].full) {
			return false;
		}
		return true;
	}

    function onTubeClick(evt: CustomEvent<TubeClick>) {
        console.log(`clicked ${JSON.stringify(evt.detail)}`)
        const tubeClick = evt.detail;
        if (!isSelectable(tubeClick.tubeId))
            return

        const newIndex: number = tubeClick.tubeId;
        if (selected === null) {
            selectTube(newIndex)
        } else if (selected === newIndex) {
            console.debug(`deselecting tube ${selected}`);
            selected = null;
        } else {
            moveWater(selected, newIndex);
            updateAutoSolution(newIndex)
            selected = null;
            highlight = null;
        }
        updateSelectableState()
    }

    function selectTube(newIndex: number) {
        selected = newIndex;
        console.debug(`selecting tube ${selected}`);
    }

    function onTubeDnD(evt: CustomEvent<TubeDragDrop>) {
        const { sourceTubeId, targetTubeId } = evt.detail
        moveWater(sourceTubeId, targetTubeId)
        selected = null
        updateSelectableState()
    }

    function updateSelectableState() {
        tubesEnabled = game.tubes.map(tube => isSelectable(tube.id))
    }

    function moveWater(from: number, to: number) {
        try {
            const historyEntry = game.historyEntry({ from, to });
            game = game.applyMove({ from, to });
            console.info(`applied move ${JSON.stringify(historyEntry)}`);
            moves = [...moves, historyEntry];
        } catch (error) {
            console.warn(error.message);
        }
    }

    function updateAutoSolution(newIndex: number) {
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
    }

    function hint() {
        if (solution.length > 0) {
            selected = solution[0].fromIndex;
            highlight = solution[0].toIndex;
        }
    }
</script>

<PageFocus />

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
    <TubesContainer tubes={game.tubes} selectedId={selected} highlightId={highlight} enabled={tubesEnabled}
        on:tube-click={onTubeClick} on:tube-drag={evt => selectTube(evt.detail.tubeId)} on:tube-drop={onTubeDnD}/>
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
