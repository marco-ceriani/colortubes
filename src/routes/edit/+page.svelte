<script>
	import { goto } from '$app/navigation';
    import { base } from '$app/paths';

	import Button from '$lib/components/Button.svelte';
	import ButtonsBar from '$lib/components/ButtonsBar.svelte';
	import ColorPicker from '$lib/components/ColorPicker.svelte';

	import { Tube } from '$lib/game/tube.js';
    import { GameState, currentGame } from '$lib/game/game.js';
	import { distributeOnRows } from '$lib/components/tubesLayout.js';
	
	let game = $currentGame;
	let tubeRows = [game.tubes];
	let currentColor = null;
	let colorCounts = {};

	let playable = false;

	/* Tubes */

	$: tubeRows = distributeOnRows(game.tubes);

	function newTubes(size, start = 0) {
		return Array(size)
			.fill()
			.map((_, i) => ({ id: start + i, levels: ['', '', '', ''] }));
	}

	function resizeTubes(evt) {
		const newSize = evt.target.value;
		if (newSize < game.tubes.length) {
			game.tubes = game.tubes.slice(0, newSize);
		}
		if (newSize > game.tubes.length) {
			const inc = newSize - game.tubes.length;
			game.tubes = [...game.tubes, ...newTubes(inc, game.tubes.length)];
		}
	}

	function reset() {
		game.tubes = newTubes(game.tubes.length);
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
        const currTube = game.tubes[tubeId];
        const newLevels = toFullTube([...currTube.levels]);
        newLevels[level] = currentColor || '';
        const newTubes = [...game.tubes];
        newTubes[tubeId] = new Tube(currTube.id, newLevels);
        game.tubes = newTubes;
	}

	function count() {
		const byColor = {};
		for (const tube of game.tubes) {
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
            const newGame = new GameState(removeEmpty(game.tubes))
            currentGame.set(newGame);
            goto(base + '/');
        }
	}

	$: colorCounts = count(game.tubes);

    $: playable = isPlayable(colorCounts)

</script>

<ButtonsBar>
	<Button on:click={reset}>Reset</Button>
	<Button href="{base}/">Discard</Button>
	<Button on:click={doPlay} disabled={!playable}>Play</Button>
</ButtonsBar>
<div>
	<label for="num_tubes">Num. Tubes</label>
	<input
		type="number"
		name="num_tubes"
		min="5"
		max="20"
		value={game.tubes.length}
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
