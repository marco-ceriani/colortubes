<script>
	import { goto } from '$app/navigation';

	import Button from '$lib/components/Button.svelte';
    import ButtonsBar from '$lib/components/ButtonsBar.svelte';
	import ColorPicker from '$lib/components/ColorPicker.svelte';

    import { currentGame } from '$lib/game/game.js';

	let tubes = newTubes(10);
	let currentColor = null;
	let colorCounts = {};

    let numColorsMaxed = false;
	let playable = false;

	function newTubes(size) {
		return Array(size)
			.fill()
			.map((_, i) => ['', '', '', '']);
	}

	function pickColor(evt) {
		currentColor = evt.detail;
	}

	function resizeTubes(evt) {
		const newSize = evt.target.value;
		if (newSize < tubes.length) {
			tubes = tubes.slice(0, newSize);
		}
		if (newSize > tubes.length) {
			const inc = newSize - tubes.length;
			tubes = [...tubes, ...newTubes(inc)];
		}
	}

    function canUseColor(color) {
        return colorCounts[currentColor] != 4 && (!numColorsMaxed || color in colorCounts)
    }

	function applyColor(tubeId, level) {
		if (currentColor && canUseColor(currentColor)) {
			console.debug(`apply color ${currentColor} to tube ${tubeId} level ${level}`);
			const newLevels = [...tubes[tubeId]];
			newLevels[level] = currentColor;
			const newTubes = [...tubes];
			newTubes[tubeId] = newLevels;
			tubes = newTubes;
		}
	}

	function reset() {
		tubes = newTubes(10);
	}

    function removeEmpty(tubes) {
        return tubes.map(tube => {
            const firstEmpty = tube.indexOf('')
            if (firstEmpty >= 0) {
                return tube.slice(0, firstEmpty)
            } else {
                return tube
            }
        })
    }

	function doPlay() {
        currentGame.set(removeEmpty(tubes));
		goto('/');
	}

	function count() {
		const byColor = {};
		for (const tube of tubes) {
			for (const color of tube) {
				if (color) {
					byColor[color] = ++byColor[color] || 1;
				}
			}
		}
		return byColor;
	}

	$: colorCounts = count(tubes);

    $: numColorsMaxed = Object.keys(colorCounts).length >= tubes.length - 2;

	$: playable =
		Object.keys(colorCounts) === tubes.length &&
		Object.values(colorCounts).reduce((a, b) => a + b, 0) === 4 * (tubes.length - 2);
</script>

<h2>Edit Puzzle</h2>
<ButtonsBar>
	<Button on:click={reset}>Reset</Button>
	<Button href="/">Discard</Button>
	<Button on:click={doPlay}>Play</Button>
</ButtonsBar>
<div>
	<label for="num_tubes">Num. Tubes</label>
	<input
		type="number"
		name="num_tubes"
		min="5"
		max="15"
		value={tubes.length}
		on:change={resizeTubes}
	/>
    <span>Enough colors: {numColorsMaxed}</span>
</div>

<ColorPicker on:color-pick={pickColor} counts={colorCounts} />

<div class="tubes-container">
	{#each tubes as tube, tid}
		<div class="tube">
			{#each tube as clr, lvl}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="block"
					on:click={() => applyColor(tid, lvl)}
					style:background-color="var(--clr-wtr{clr})"
				/>
			{/each}
		</div>
	{/each}
</div>

<style>
	input[type='number'] {
		max-width: 6ch;
	}
	.tubes-container {
        display: grid;
		grid-template-rows: repeat(2, auto);
        grid-auto-flow: column;
		gap: 1rem;
		margin-block: 1rem;
	}
	.tube {
		display: inline-flex;
		flex-direction: column-reverse;
		width: 3rem;
		border: 1px solid white;
	}

	.block {
		height: 3rem;
	}
</style>
