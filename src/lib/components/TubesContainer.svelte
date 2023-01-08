<script>
	import { createEventDispatcher } from 'svelte';
	import Tube from './Tube.svelte';

	const dispatch = createEventDispatcher();

	export let tubes;
	let selected = null;

	function selectTube(id) {
        if (!tubes[id].done) {
            if (selected === null) {
                selected = id;
            } else if (selected !== id && !tubes[id].done) {
                dispatch('move', {
                    from: selected,
                    to: id
                });
                selected = null;
            } else {
                selected = null;
            }
        }
	}
</script>

<div class="tubes-container">
	{#each tubes as tube}
		<Tube
            tube={tube}
			selected={selected === tube.id}
			on:click={() => selectTube(tube.id)}
		/>
	{/each}
</div>

<style>
	.tubes-container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
		margin-block: 3rem;
		row-gap: 3rem;
	}
</style>
