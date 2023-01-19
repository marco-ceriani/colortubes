<script>
	import { createEventDispatcher } from 'svelte';
	import Tube from './Tube.svelte';

	const dispatch = createEventDispatcher();

	export let tubes;
    export let selectable = '';
	export let selected = null;
    export let highlight = null;

    function isSelectable(id, current) {
        if (current === id) {
            return false
        }
        if (tubes[id].done) {
            return false
        }
        if (selectable === 'non-empty' && tubes[id].empty) {
            return false
        }
        if (selectable === 'non-full' && tubes[id].full) {
            return false
        }
        return true
    }

	function selectTube(id) {
        if (isSelectable(id, selected)) {
                // dispatch('move', {
                //     from: selected,
                //     to: id
                // });
            dispatch('select', id)
        }
	}
</script>

<div class="tubes-container">
	{#each tubes as tube}
		<Tube
            tube={tube}
			selected={selected === tube.id}
            selectable={isSelectable(tube.id, selected)}
            highlight = {highlight === tube.id}
			on:click={() => selectTube(tube.id)}
		/>
	{/each}
</div>

<style>
	.tubes-container {
		display: grid;
		grid-template-rows: repeat(2, auto);
        grid-auto-flow: column;
		margin-block: 3rem;
		row-gap: 3rem;
	}
</style>
