<script>
	import { createEventDispatcher } from 'svelte';
	import Tube from './Tube.svelte';
	import { isDone } from '$lib/game/logic';

	const dispatch = createEventDispatcher();

	export let tubes;
	let selected = null;

	function selectTube(id) {
		if (selected === null) {
			selected = id;
		} else if (selected !== id && !isDone(tubes[id])) {
			dispatch('move', {
				from: selected,
				to: id
			});
			selected = null;
		} else {
			console.log('deselecting');
			selected = null;
		}
	}
</script>

<div class="tubes-container">
	{#each tubes as tube, index}
		<Tube
			levels={tube}
			selected={selected === index}
			closed={isDone(tube)}
			on:click={() => selectTube(index)}
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
