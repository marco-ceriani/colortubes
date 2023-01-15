<script>
    import { goto } from '$app/navigation'

    import Button from '$lib/components/Button.svelte';
    import ColorPicker from '$lib/components/ColorPicker.svelte';

    let tubes = newTubes(10)
    let currentColor = null
    let colorCounts = {}

    function newTubes(size) {
        return Array(size).fill().map((_, i) => ['', '', '', ''])
    }

    function pickColor(evt) {
        currentColor = evt.detail
    }

    function resizeTubes(evt) {
        const newSize = evt.target.value
        if (newSize < tubes.length) {
            tubes = tubes.slice(0, newSize)
        }
        if (newSize > tubes.length) {
            const inc = newSize - tubes.length
            tubes = [...tubes, ...newTubes(inc)]
        }
        
    }

    function applyColor(tubeId, level) {
        if (currentColor && colorCounts[currentColor] != 4) {
            console.log(`click ${tubeId} - ${level}`)
            const newLevels = [...tubes[tubeId]]
            newLevels[level] = currentColor
            const newTubes = [...tubes]
            newTubes[tubeId] = newLevels
            tubes = newTubes
        }
    }

    function reset() {
        tubes = newTubes(10)
    }

    function doPlay() {
        goto('/')
    }

    function count() {
        const byColor = {}
        for (const tube of tubes) {
            for (const color of tube) {
                if (color) {
                    byColor[color] = ++byColor[color] || 1
                }
            }
        }
        return byColor
    }

    $: colorCounts = count(tubes)

</script>

<h2>Edit Puzzle</h2>
<div class="navbar">
    <Button on:click={reset}>Reset</Button>
    <Button href="/">Discard</Button>
    <Button on:click={doPlay}>Play</Button>
</div>
<div>
    <label for="num_tubes">Num. Tubes</label>
    <input type="number" name="num_tubes" min="5" max="15" value={tubes.length} on:change={resizeTubes}/>
</div>

<ColorPicker numColors={12} on:color-pick={pickColor} />

<div class="tubes-container">
    {#each tubes as tube, tid}
        <div class="tube">
            {#each tube as clr, lvl}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="block" on:click={() => applyColor(tid, lvl)} style:background-color="var(--clr-{clr})"></div>
            {/each}
        </div>
    {/each}
</div>

<div>
    {#each Object.entries(colorCounts) as [clr, count]}
        <div ><span class="square" style:background-color="var(--clr-{clr})"></span>{count}</div>
    {/each}
</div>

<style>
    input[type='number'] {
        max-width: 6ch;
    }
    .navbar {
        margin-block-end: 1rem;
        display: flex;
        gap: .75rem;
    }
    .tubes-container {
        display: flex;
        flex-flow: row wrap;
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
    .square {
        display: inline-block;
        height: 1em;
        width: 2ch;
        margin-inline-end: 1ch;
    }
</style>
