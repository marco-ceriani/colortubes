<script>
    import { createEventDispatcher } from 'svelte';
    import { NUM_COLORS } from '$lib/game/game.js';
    const dispatch = createEventDispatcher();

    export let counts = {}
    
    const colors = Array(NUM_COLORS).fill().map((_, i) => i + 1)
    let selected = null

    function selectColor(color) {
        selected = color
        dispatch('color-pick', color)
    }
</script>


<div class="palette">
    {#each colors as color}
        <button on:click={() => selectColor(color)}
            class="cell"
            class:curr={color === selected} 
            class:extra={counts[color] > 4}
            style:--color="var(--clr-wtr{color >= 0 ? color : '-none'})">
            {counts[color] || ''}
        </button>
    {/each}
    <button on:click={() => selectColor(null)}
        class="cell empty"
        class:curr={null === selected} 
        style:--color="var(--clr-wtr-none)">
    </button>
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
        position: relative;
    }
    .curr {
        outline: black solid .125rem;
        outline-offset: -.25rem;
    }
    .curr.empty {
        outline: white solid .125rem;
        outline-offset: -.25rem;
    }
    .empty:before,.empty:after {
        content: '';
        width: 75%;
        height: .125rem;
        background-color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) rotate(-36deg) ;
    }
    .empty:before{
        transform:  translateX(-50%) rotate(36deg);
        
    }
    .extra {
        outline: red solid .25rem;
        outline-offset: -.25rem;
    }
</style>