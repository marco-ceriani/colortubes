<script>
	import Tubes from '$lib/components/TubesContainer.svelte';
    import Moves from '$lib/components/MovesLog.svelte';
	import { moveWater, isGameWon, Tube } from '$lib/game/logic.js';

	let won = false;

	let intial_tubes = [
		new Tube(0, ['brown', 'purple', 'cyan', 'orange']),
		new Tube(1, ['red', 'pink', 'pink', 'pink']),
		new Tube(2, ['dodgerblue', 'cyan', 'purple', 'cyan']),
		new Tube(3, ['blue', 'dodgerblue', 'orange', 'brown']),
		new Tube(4, ['brown', 'dodgerblue', 'purple', 'blue']),
		new Tube(5, ['blue', 'dodgerblue', 'green', 'pink']),

		new Tube(6, ['orange', 'red', 'purple', 'cyan']),
		new Tube(7, ['red', 'green', 'brown', 'green']),
		new Tube(8, ['red', 'blue', 'orange', 'green']),
		new Tube(9, []),
		new Tube(10, [])
	];
	let tubes = [...intial_tubes];
	let moves = [];

	function onMoveWater(event) {
		const { from, to } = event.detail;
		try {
			const res = moveWater(tubes[from], tubes[to]);
			const newTubes = [...tubes];
			newTubes[from] = res[0];
			newTubes[to] = res[1];
			tubes = newTubes;
			won = isGameWon(tubes);
			moves = [...moves, `${tubes[to].topColor} from ${tubes[from].name} to ${tubes[to].name}`];
		} catch (error) {
			console.log(error.message);
		}
	}

    function reset() {
        tubes = [...intial_tubes];
        moves = [];
    }

	$: console.log(`Won? ${won}`);
</script>

<button on:click={reset}>Reset</button>
<Tubes {tubes} on:move={onMoveWater} />
<Moves moves={moves} />
