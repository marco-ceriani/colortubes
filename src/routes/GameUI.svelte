<script lang="ts">
    import { onMount } from "svelte";

    import ButtonsBar from "../components/ButtonsBar.svelte";
    import Button from "../components/Button.svelte";
    import TubesContainer from "../components/TubesContainer.svelte";
    import EndModal from "../components/EndModal.svelte";
    import PageFocus from "../components/PageFocus.svelte";

    import type {
        TubeClick,
        TubeDrag,
        TubeDragDrop,
    } from "../components/events";

    import {
        GameState,
        GameStatus,
        currentGame,
        randomGame,
    } from "../game/game.js";
    import { p } from "../router";
    import type { GameMoveRecord } from "../game/game.js";
    import type { ExplorationResult } from "../game/solver";

    import Solver from "../solve-worker?worker";
    let solverWorker: Worker = $state(null);
    let solving: boolean = $state(false);

    let game: GameState = $state($currentGame);
    let selected: number = $state(null);
    let moves: GameMoveRecord[] = [];
    let tubesEnabled: boolean[] = $state([]);

    let solution: GameMoveRecord[] = $state([]);
    let highlight: number = $state(null);

    onMount(async () => {
        console.log("initializing web worker");
        solverWorker = new Solver();
        solverWorker.onmessage = function (
            evt: MessageEvent<ExplorationResult>,
        ) {
            if (evt.data.result === GameStatus.Won) {
                solution = evt.data.actions;
                console.debug(solution);
            }
            solving = false;
        };
    });

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
        updateSelectableState();
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

    function onTubeClick(evt: TubeClick) {
        console.log(`clicked ${JSON.stringify(evt)}`);
        const newIndex: number = evt.tubeId;
        if (!isSelectable(newIndex)) return;

        if (selected === null) {
            selectTube(newIndex);
        } else if (selected === newIndex) {
            console.debug(`deselecting tube ${selected}`);
            selected = null;
        } else {
            moveWater(selected, newIndex);
            updateAutoSolution(newIndex);
            selected = null;
            highlight = null;
        }
        updateSelectableState();
    }

    function selectTube(newIndex: number) {
        selected = newIndex;
        console.debug(`selecting tube ${selected}`);
    }

    function onTubeDnD(evt: TubeDragDrop) {
        const { sourceTubeId, targetTubeId } = evt;
        if (!isSelectable(targetTubeId)) return;

        if (selected === targetTubeId) {
            console.debug(`deselecting tube ${selected}`);
            selected = null;
        } else {
            moveWater(sourceTubeId, targetTubeId);
            updateAutoSolution(targetTubeId);
            selected = null;
        }
        updateSelectableState();
    }

    function updateSelectableState() {
        tubesEnabled = game.tubes.map((tube) => isSelectable(tube.id));
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
    <Button onclick={newGame}>New</Button>
    <Button onclick={reset}>Restart</Button>
    <Button href={p("/edit")}>Edit</Button>
    {#if solverWorker && solution.length == 0}
        <Button onclick={solve} spin={solving}>Solve</Button>
    {/if}
    {#if solution.length > 0}
        <Button onclick={hint}>💡</Button>
    {/if}
</ButtonsBar>

<div class="cols-2">
    <TubesContainer
        tubes={game.tubes}
        selectedId={selected}
        highlightId={highlight}
        enabled={tubesEnabled}
        onclick={onTubeClick}
        ondrag={(evt) => selectTube(evt.tubeId)}
        ondrop={onTubeDnD}
    />
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
