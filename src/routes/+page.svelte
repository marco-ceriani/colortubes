<script>
	import { onMount } from 'svelte';
    import Button from '$lib/components/Button.svelte';
    import ButtonsBar from '$lib/components/ButtonsBar.svelte';
	import Tubes from '$lib/components/TubesContainer.svelte';
	import Moves from '$lib/components/MovesLog.svelte';
	import EndModal from '$lib/components/EndModal.svelte';
	import { GameState, currentGame } from '$lib/game/game.js';

    import Solver from '$lib/solve-worker?worker'
	let solverWorker = undefined;

	let game = new GameState($currentGame);
    let selected = null;
    let selectable;
	let moves = [];
    
    let solution = [];
    let highlight = null;

	onMount(async () => {
        solverWorker = new Solver()
        solverWorker.onmessage = function(evt) {
            solution = evt.data.actions
        }
	});

    $: selectable = selected ? 'non-full' : 'non-empty';

	function reset() {
		game = new GameState($currentGame);
        selected = null;
		moves = [];
        highlight = null;
	}

	function solve() {
		solverWorker.postMessage(game);
	}

    function selectTube(evt) {
        const newIndex = evt.detail
        if (selected === null) {
            selected = newIndex
            console.debug(`selecting ${selected}`)
        } else {
            moveWater(selected, newIndex)
            if (solution.length > 0) {
                const suggestion = solution[0]
                if (newIndex === suggestion.toIndex && selected === suggestion.fromIndex) {
                    solution = solution.slice(1)
                } else {
                    solution = []
                }
            }
            selected = null;
            highlight = null;
        }
    }

	function moveWater(from, to) {
		try {
			const historyEntry = game.historyEntry({ from, to });
			game = game.applyMove({ from, to });
			console.debug(`applied move ${JSON.stringify(historyEntry)}`)
			moves = [...moves, historyEntry];
		} catch (error) {
			console.log(error.message);
		}
	}

    function hint() {
        if (solution.length > 0) {
            selected = solution[0].fromIndex
            highlight = solution[0].toIndex
        }
    }

</script>

<ButtonsBar>
    <Button href="/edit">Custom</Button>
    <Button on:click={reset}>Reset</Button>
    {#if solverWorker && solution.length == 0}
        <Button on:click={solve}>Solve</Button>
    {/if}
    {#if solution.length > 0} 
        <Button on:click={hint}>💡</Button>
    {/if}
</ButtonsBar>

<div class="cols-2">
	<Tubes tubes={game.tubes} {selected} {selectable} {highlight} on:select={selectTube} />
    <Moves {moves} />
</div>


{#if game.status}
	<EndModal message={game.won ? 'You Win!' : 'Game Over'} />
{/if}

<style>
    .cols-2 {
        display: grid;
        grid-template-columns: 1fr max-content;
    }
</style>