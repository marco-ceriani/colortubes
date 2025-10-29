<script lang="ts">
    import Button from "../components/Button.svelte";
    import ButtonsBar from "../components/ButtonsBar.svelte";
    import ColorPicker from "../components/ColorPicker.svelte";
    import TubesContainer from "../components/TubesContainer.svelte";
    import PageFocus from "../components/PageFocus.svelte";
    import type { TubeClick } from "../components/events";
    import { p, navigate } from "../router";

    import { Tube } from "../game/tube";
    import type { color } from "../game/tube";
    import { GameState, currentGame } from "../game/game";

    type ColorUsageCount = { [key: number]: number };

    let game: GameState = $state(fillEmpty($currentGame));
    let tubesEnabled: boolean[] = $state([]);
    let currentColor: color = null;
    let colorCounts: ColorUsageCount = $derived(count(game.tubes));
    let playable = $derived(isPlayable(colorCounts));

    /* Tubes */

    function newTubes(size: number, start = 0) {
        return Array(size)
            .fill(null)
            .map((_, i) => new Tube(start + i, [0, 0, 0, 0]));
    }

    function resizeTubes(evt: Event) {
        const target = evt.target as HTMLInputElement;
        const newSize: number = +target.value;
        if (newSize < game.tubes.length) {
            game = new GameState(game.tubes.slice(0, newSize));
        }
        if (newSize > game.tubes.length) {
            const inc = newSize - game.tubes.length;
            game = new GameState([
                ...game.tubes,
                ...newTubes(inc, game.tubes.length),
            ]);
        }
        tubesEnabled = game.tubes.map((_) => true);
    }

    function reset() {
        game = new GameState(newTubes(game.tubes.length));
    }

    function fillEmpty(state: GameState) {
        const tubes = state.tubes.map((tube, index) => {
            return new Tube(tube.id, toFullTube(tube.levels));
        });
        return new GameState(tubes);
    }

    function removeEmpty(tubes: Tube[]) {
        return tubes.map((tube) => {
            const firstEmpty = tube.levels.indexOf(0);
            if (firstEmpty >= 0) {
                return new Tube(tube.id, tube.levels.slice(0, firstEmpty));
            } else {
                return tube;
            }
        });
    }

    /* Color selection and use */

    function pickColor(color: number) {
        console.debug(`picked color ${color}`);
        currentColor = color;
    }

    function toFullTube(values: number[]) {
        if (values.length < 4) {
            return values.concat(new Array(4 - values.length).fill(0));
        }
        return values;
    }

    function applyColor(tubeId: number, level: number) {
        console.debug(
            `apply color ${currentColor} to tube ${tubeId} level ${level}`,
        );
        const currTube = game.tubes[tubeId];
        const newLevels = toFullTube([...currTube.levels]);
        newLevels[level] = currentColor || 0;
        const newTubes = [...game.tubes];
        newTubes[tubeId] = new Tube(currTube.id, newLevels);
        game = new GameState(newTubes);
    }

    function onTubeClick(data: TubeClick) {
        applyColor(data.tubeId, data.level);
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

    function isPlayable(counts: ColorUsageCount): boolean {
        const distinctCounts = new Set(Object.values(counts));
        return distinctCounts.size === 1 && distinctCounts.has(4);
    }

    function startPlay() {
        if (playable) {
            const newGame = new GameState(removeEmpty(game.tubes));
            currentGame.set(newGame);
            navigate("/game");
        }
    }
</script>

<PageFocus />

<ButtonsBar>
    <Button onclick={reset}>Reset</Button>
    <Button href={p("/")}>Discard</Button>
    <Button onclick={startPlay} disabled={!playable}>Play</Button>
</ButtonsBar>

<div>
    <label for="num_tubes">Num. Tubes</label>
    <input
        type="number"
        name="num_tubes"
        min="5"
        max="20"
        value={game.tubes.length}
        onchange={resizeTubes}
    />
</div>

<ColorPicker onColorPick={pickColor} counts={colorCounts} />

<TubesContainer
    tubes={game.tubes}
    enabled={tubesEnabled}
    onclick={onTubeClick}
/>

<style>
    input[type="number"] {
        max-width: 6ch;
    }
</style>
