<script>
	import Tubes from '$lib/components/TubesContainer.svelte';
    import Moves from '$lib/components/MovesLog.svelte';
    import EndModal from '$lib/components/EndModal.svelte';
	import { isGameWon, Tube } from '$lib/game/tube.js';
    import { GameState } from '$lib/game/game.js';

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

	function onMoveWater(event) {
		const { from, to } = event.detail;
		try {
            const action = game.getAction(from, to)
            game = game.applyMove(action)
			won = isGameWon(game.tubes);
			moves = [...moves, `${action.color} from ${action.fromId} to ${action.toId}`];
		} catch (error) {
			console.log(error.message);
		}
	}

    function reset() {
        game = new GameState([...intial_tubes]);
        moves = [];
    }

	$: console.log(`Won? ${game.status}`);
</script>

<button on:click={reset}>Reset</button>
{#if game.status}
<EndModal message={game.won ? "You Win!" : "Game Over"}></EndModal>
{/if}
<Tubes tubes={game.tubes} on:move={onMoveWater} />
<Moves moves={moves} />
