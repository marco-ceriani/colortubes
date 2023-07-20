<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import TubeComponent from './Tube.svelte';
	import { distributeOnRows } from './tubesLayout';
	
	import type{ TubeClick } from './events'
	import type { Tube } from '../game/tube';
	export let tubes: Tube[];
	export let enabled: boolean[];
	export let selectedId: number = null;
	export let highlightId: number = null;

	let rows: Tube[][] = [];

	$: rows = distributeOnRows(tubes);

</script>

<div class="tubes-container">
	{#each rows as row}
		<div class="tubes-row">
			{#each row as tube (tube.id)}
				<TubeComponent
					{tube}
					selected={selectedId === tube.id}
					selectable={enabled[tube.id]}
					highlight={highlightId === tube.id}
					on:tube-click
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
