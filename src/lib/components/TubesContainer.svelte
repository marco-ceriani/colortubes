<script>
	import { createEventDispatcher } from 'svelte';
	import Tube from './Tube.svelte';
    import { distributeOnRows } from '$lib/components/tubesLayout.js';

	const dispatch = createEventDispatcher();

	export let tubes;
	export let selected = null;
	export let highlight = null;

	let rows = [];

	$: rows = distributeOnRows(tubes);

	function isSelectable(id) {
		if (selected === id) {
			return true;
		}
		if (tubes[id].done) {
			return false;
		}
		if (selected === null && tubes[id].empty) {
			return false;
		}
		if (selected !== null && tubes[id].full) {
			return false;
		}
		return true;
	}

	function selectTube(id) {
		if (isSelectable(id, selected)) {
			dispatch('select', id);
		}
	}
</script>

<div class="tubes-container">
	{#each rows as row}
		<div class="tubes-row">
			{#each row as tube}
				<Tube
					{tube}
					selected={selected === tube.id}
					selectable={isSelectable(tube.id, selected)}
					highlight={highlight === tube.id}
					on:click={() => selectTube(tube.id)}
				/>
			{/each}
		</div>
	{/each}
</div>

<style>
    .tubes-row {
        display: flex;
        justify-content: space-around;
        margin-block: 3rem;
    }
</style>
