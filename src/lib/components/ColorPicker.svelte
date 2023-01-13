<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let numColors = 9

    const colors = Array(numColors).fill().map((_, i) => "wtr"+i)

    function selectColor(color) {
        dispatch('color-pick', color)
    }
</script>


<div class="palette">
    {#each colors as color}
        <button on:click={() => selectColor(color)} class="cell" style:--color="var(--clr-{color})"></button>
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
</style>