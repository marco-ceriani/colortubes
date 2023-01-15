<script>
	import { onMount } from 'svelte';
	import Tubes from '$lib/components/TubesContainer.svelte';
	import Moves from '$lib/components/MovesLog.svelte';
	import EndModal from '$lib/components/EndModal.svelte';
	import { Tube } from '$lib/game/tube.js';
	import { GameState } from '$lib/game/game.js';

    import Solver from '$lib/solve-worker?worker'

	let intial_tubes = [
		new Tube(0, ['wtr0', 'wtr8', 'wtr5', 'wtr2']),
		new Tube(1, ['wtr1', 'wtr3', 'wtr3', 'wtr3']),
		new Tube(2, ['wtr6', 'wtr5', 'wtr8', 'wtr5']),
		new Tube(3, ['wtr7', 'wtr6', 'wtr2', 'wtr0']),
		new Tube(4, ['wtr0', 'wtr6', 'wtr8', 'wtr7']),
		new Tube(5, ['wtr7', 'wtr6', 'wtr4', 'wtr3']),

		new Tube(6, ['wtr2', 'wtr1', 'wtr8', 'wtr5']),
		new Tube(7, ['wtr1', 'wtr4', 'wtr0', 'wtr4']),
		new Tube(8, ['wtr1', 'wtr7', 'wtr2', 'wtr4']),
		new Tube(9, []),
		new Tube(10, [])
	];

	let game = new GameState([...intial_tubes]);
    let selected = null;
    let selectable;
	let moves = [];

    let fillColor = null;

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
		game = new GameState([...intial_tubes]);
        selected = null;
		moves = [];
	}

	function solve() {
		solverWorker.postMessage(game);
	}

    function selectTube(evt) {
        console.log(`selecting ${evt.detail}, current: ${selected}`)
        if (selected === null) {
            selected = evt.detail
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
    <button on:click={reset}>Reset</button>
    {#if solverWorker}
        <button on:click={solve}>Solve</button>
    {/if}
    <a href="/edit">Custom</a>
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