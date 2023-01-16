<script>
	import { onMount } from 'svelte';
    import Button from '$lib/components/Button.svelte';
	import Tubes from '$lib/components/TubesContainer.svelte';
	import Moves from '$lib/components/MovesLog.svelte';
	import EndModal from '$lib/components/EndModal.svelte';
	import { Tube } from '$lib/game/tube.js';
	import { GameState, currentGame } from '$lib/game/game.js';

    import Solver from '$lib/solve-worker?worker'

	let game = new GameState($currentGame);
    let selected = null;
    let selectable;
	let moves = [];

	let solverWorker = undefined;
    let solution = [];

	onMount(async () => {
		//solverWorker = new Worker(new URL('./solver.js', import.meta.url));
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
	}

	function solve() {
		solverWorker.postMessage(game);
	}

    function selectTube(evt) {
        if (selected === null) {
            selected = evt.detail
            console.debug(`selecting ${selected}`)
        } else {
            moveWater(selected, evt.detail)
            selected = null;
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

</script>

<div class="buttons">
    <Button on:click={reset}>Reset</Button>
    {#if solverWorker}
        <Button on:click={solve}>Solve</Button>
    {/if}
    <Button href="/edit">Custom</Button>
</div>

<div class="cols-2">
	<Tubes tubes={game.tubes} {selected} {selectable} on:select={selectTube} />
    <Moves {moves} />
</div>
{#if solution.length > 0}
<Moves title='Solution' moves={solution} />
{/if}


{#if game.status}
	<EndModal message={game.won ? 'You Win!' : 'Game Over'} />
{/if}

<style>
    .cols-2 {
        display: grid;
        grid-template-columns: 1fr max-content;
    }
</style>