<script>
	import { goto } from '$app/navigation';

	import Button from '$lib/components/Button.svelte';
	import ButtonsBar from '$lib/components/ButtonsBar.svelte';
	import ColorPicker from '$lib/components/ColorPicker.svelte';

	import { Tube } from '$lib/game/tube.js';
    import { currentGame } from '$lib/game/game.js';
	import { distributeOnRows } from '$lib/components/tubesLayout.js';
	
	let tubes = $currentGame;
	let tubeRows = [tubes];
	let currentColor = null;
	let colorCounts = {};

	let playable = false;

	/* Tubes */

	$: tubeRows = distributeOnRows(tubes);

	function newTubes(size, start = 0) {
		return Array(size)
			.fill()
			.map((_, i) => ({ id: start + i, levels: ['', '', '', ''] }));
	}

	function resizeTubes(evt) {
		const newSize = evt.target.value;
		if (newSize < tubes.length) {
			tubes = tubes.slice(0, newSize);
		}
		if (newSize > tubes.length) {
			const inc = newSize - tubes.length;
			tubes = [...tubes, ...newTubes(inc, tubes.length)];
		}
	}

	function reset() {
		tubes = newTubes(10);
	}

	function removeEmpty(tubes) {
		return tubes.map((tube) => {
			const firstEmpty = tube.levels.indexOf('');
			if (firstEmpty >= 0) {
				return new Tube(tube.id, tube.levels.slice(0, firstEmpty))
			} else {
				return tube;
			}
		});
	}

	/* Color selection and use */

	function pickColor(evt) {
		currentColor = evt.detail;
	}

    function toFullTube(values) {
        if (values.length < 4) {
            return values.concat(new Array(4 - values.length).fill(''))
        }
        return values
    }

	function applyColor(tubeId, level) {
        console.debug(`apply color ${currentColor} to tube ${tubeId} level ${level}`);
        const currTube = tubes[tubeId];
        const newLevels = toFullTube([...currTube.levels]);
        newLevels[level] = currentColor || '';
        const newTubes = [...tubes];
        newTubes[tubeId] = new Tube(currTube.id, newLevels);
        tubes = newTubes;
	}

	function count() {
		const byColor = {};
		for (const tube of tubes) {
			for (const color of tube.levels) {
				if (color) {
					byColor[color] = ++byColor[color] || 1;
				}
			}
		}
		return byColor;
	}

    function isPlayable(counts) {
        const distinctCounts = new Set(Object.values(colorCounts))
        return distinctCounts.size === 1 && distinctCounts.has(4)
    }

	function doPlay() {
        if (playable) {
            currentGame.set(removeEmpty(tubes));
            goto('/');
        }
	}

	$: colorCounts = count(tubes);

    $: playable = isPlayable(colorCounts)

</script>

<h2>Edit Puzzle</h2>
<ButtonsBar>
	<Button on:click={reset}>Reset</Button>
	<Button href="/">Discard</Button>
	<Button on:click={doPlay} disabled={!playable}>Play</Button>
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
</div>

<ColorPicker on:color-pick={pickColor} counts={colorCounts} />

<div>
	{#each tubeRows as row}
		<div class="tubes-row">
			{#each row as tube}
				<div class="tube">
                    {#each Array(4) as _, lvl}
					<!--{#each tube.levels as clr, lvl}-->
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							class="block"
							on:click={() => applyColor(tube.id, lvl)}
							style:background-color="var(--clr-wtr{tube.levels[lvl] || ''})"
						/>
					{/each}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	input[type='number'] {
		max-width: 6ch;
	}
	.tubes-row {
		display: flex;
		justify-content: space-around;
		margin-block: 3rem;
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
