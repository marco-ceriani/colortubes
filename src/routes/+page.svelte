<script>
	import { onMount } from 'svelte';
	import Tubes from '$lib/components/TubesContainer.svelte';
	import Moves from '$lib/components/MovesLog.svelte';
	import EndModal from '$lib/components/EndModal.svelte';
	import { isGameWon, Tube } from '$lib/game/tube.js';
	import { GameState } from '$lib/game/game.js';

    import Solver from '$lib/solve-worker?worker'

	let won = false;

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

	function onMoveWater(event) {
		const { from, to } = event.detail;
		try {
			const historyEntry = game.historyEntry({ from, to });
			game = game.applyMove({ from, to });
			won = isGameWon(game.tubes);
			console.debug(`applied move ${JSON.stringify(historyEntry)}`)
			moves = [...moves, historyEntry];
		} catch (error) {
			console.log(error.message);
		}
	}

	function reset() {
		game = new GameState([...intial_tubes]);
		moves = [];
	}

	function solve() {
		solverWorker.postMessage(game);
	}

</script>

<button on:click={reset}>Reset</button>
{#if solverWorker}
	<button on:click={solve}>Solve</button>
{/if}

<div class="cols-2">
	<Tubes tubes={game.tubes} on:move={onMoveWater} />
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