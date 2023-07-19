<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import TubeComponent from './Tube.svelte';
	import type { Tube } from '../game/tube';
	import { distributeOnRows } from './tubesLayout';

	const dispatch = createEventDispatcher<{select: number}>();

	export let tubes: Tube[];
	export let selected: number = null;
	export let highlight = null;

	let rows: Tube[][] = [];

	$: rows = distributeOnRows(tubes);

	function isSelectable(id: number) {
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

	function selectTube(id: number) {
		if (isSelectable(id)) {
			dispatch('select', id);
		}
	}
</script>

<div class="tubes-container">
	{#each rows as row}
		<div class="tubes-row">
			{#each row as tube}
				<TubeComponent
					{tube}
					selected={selected === tube.id}
					selectable={isSelectable(tube.id)}
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
