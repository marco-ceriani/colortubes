<script>
	import Tubes from '$lib/components/TubesContainer.svelte';
    import Moves from '$lib/components/MovesLog.svelte';
	import { moveWater, isGameWon, topColor } from '$lib/game/logic.js';

	let won = false;

	let intial_tubes = [
		['brown', 'purple', 'cyan', 'orange'],
		['red', 'pink', 'pink', 'pink'],
		['dodgerblue', 'cyan', 'purple', 'cyan'],
		['blue', 'dodgerblue', 'orange', 'brown'],
		['brown', 'dodgerblue', 'purple', 'blue'],
		['blue', 'dodgerblue', 'green', 'pink'],

		['orange', 'red', 'purple', 'cyan'],
		['red', 'green', 'brown', 'green'],
		['red', 'blue', 'orange', 'green'],
		[],
		[]
	];
	let tubes = [...intial_tubes];
	let moves = [];

	function ordinal(num) {
		switch (num) {
			case 1:
				return '1st';
			case 2:
				return '2nd';
			case 3:
				return '3rd';
			default:
				return num + 'th';
		}
	}

	function onMoveWater(event) {
		const { from, to } = event.detail;
		try {
			const res = moveWater(tubes[from], tubes[to]);
			const newTubes = [...tubes];
			newTubes[from] = res[0];
			newTubes[to] = res[1];
			tubes = newTubes;
			won = isGameWon(tubes);
			moves = [...moves, `${topColor(tubes[to])} from ${ordinal(from + 1)} to ${ordinal(to + 1)}`];
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
