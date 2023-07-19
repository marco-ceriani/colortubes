<script lang="ts">
	import Button from '../components/Button.svelte';
	import ButtonsBar from '../components/ButtonsBar.svelte';
	import ColorPicker from '../components/ColorPicker.svelte';

	import { Tube } from '../game/tube';
	import type { color } from '../game/tube';
	import { GameState, currentGame } from '../game/game';
	import { distributeOnRows } from '../components/tubesLayout.js';

    import { navigate } from "svelte-navigator";

    type ColorUsageCount = {[key: number]: number}

	let game: GameState = $currentGame;
	let tubeRows = [game.tubes];
	let currentColor: color = null;
	let colorCounts: ColorUsageCount = {};

	let playable = false;

    /* Tubes */

	$: tubeRows = distributeOnRows(game.tubes);

	function newTubes(size: number, start = 0) {
		return Array(size)
			.fill(null)
			.map((_, i) => new Tube(start + i, [0, 0, 0, 0]));
	}

	function resizeTubes(evt: Event) {
		const target = evt.target as HTMLInputElement;
		const newSize: number = +target.value;
		if (newSize < game.tubes.length) {
			game.tubes = game.tubes.slice(0, newSize);
		}
		if (newSize > game.tubes.length) {
			const inc = newSize - game.tubes.length;
			game.tubes = [...game.tubes, ...newTubes(inc, game.tubes.length)];
		}
	}

	function reset() {
		game = new GameState(newTubes(game.tubes.length));
	}

    function removeEmpty(tubes: Tube[]) {
		return tubes.map((tube) => {
			const firstEmpty = tube.levels.indexOf(0);
			if (firstEmpty >= 0) {
				return new Tube(tube.id, tube.levels.slice(0, firstEmpty))
			} else {
				return tube;
			}
		});
	}

    /* Color selection and use */

	function pickColor(evt: CustomEvent<number>) {
		currentColor = evt.detail;
	}

    function toFullTube(values: number[]) {
        if (values.length < 4) {
            return values.concat(new Array(4 - values.length).fill(0))
        }
        return values
    }

	function applyColor(tubeId: number, level: number) {
        console.debug(`apply color ${currentColor} to tube ${tubeId} level ${level}`);
        const currTube = game.tubes[tubeId];
        const newLevels = toFullTube([...currTube.levels]);
        newLevels[level] = currentColor || 0;
        const newTubes = [...game.tubes];
        newTubes[tubeId] = new Tube(currTube.id, newLevels);
        game.tubes = newTubes;
    }

    function count(tubes: Tube[]) {
		const byColor: ColorUsageCount = {};
		for (const tube of tubes) {
			for (const color of tube.levels) {
				if (color) {
					byColor[color] = ++byColor[color] || 1;
				}
			}
		}
		return byColor;
	}
    
	function blockCssClass(tube: Tube, level: number): string {
		const blockColor: number = tube.levels[level];
		if (blockColor > 0) {
			return '--clr-wtr' + blockColor;
		}
		return '--clr-none';
	}

    function isPlayable(counts: ColorUsageCount): boolean {
        console.debug('is playable?')
        console.debug(counts)
        const distinctCounts = new Set(Object.values(counts))
        console.debug(distinctCounts)
        return distinctCounts.size === 1 && distinctCounts.has(4)
    }

	function doPlay() {
        if (playable) {
            const newGame = new GameState(removeEmpty(game.tubes))
            currentGame.set(newGame);
            navigate('/');
        }
    }

    $: colorCounts = count(game.tubes);

    $: playable = isPlayable(colorCounts)

</script>

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
							style:background-color="var({blockCssClass(tube, lvl)})"
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
