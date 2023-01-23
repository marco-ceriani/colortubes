<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let numColors = 17
    export let counts = {}
    
    const colors = Array(numColors).fill().map((_, i) => i + 1)
    let selected = null

    function selectColor(color) {
        selected = color
        dispatch('color-pick', color)
    }
</script>


<div class="palette">
    {#each colors as color}
        <button on:click={() => selectColor(color)}
            class="cell" class:curr={color === selected} style:--color="var(--clr-wtr{color})">
            {counts[color] || ''}
        </button>
    {/each}
</div>

<style>
    .palette {
        display: flex;
        flex-flow: row wrap;
    }
    .cell {
        width: 2.5rem;
        height: 1.8rem;
        border:1px solid white;
        display: inline-block;
        background-color: var(--color);
    }
    .curr {
        outline: black solid .125rem;
        outline-offset: -.25rem;
    }
</style>