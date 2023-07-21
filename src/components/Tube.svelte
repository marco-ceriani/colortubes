<script lang="ts">
	import type { Tube } from "../game/tube";
	import type { TubeClick, TubeDrag, TubeDragDrop } from "./events";

	import { fly } from "svelte/transition";
	import { linear } from "svelte/easing";
	import { createEventDispatcher } from "svelte";

	export let tube: Tube;
	export let selected = false;
	export let highlight = false;
	export let selectable: boolean;
	let dropping = false;

	const dispatchAction = createEventDispatcher<{ 
		"tube-click": TubeClick,
		"tube-drop": TubeDragDrop,
		"tube-drag": TubeDrag
	}>();

	const onClick = (level: number) => {
		dispatchAction("tube-click", {
			tubeId: tube.id,
			level: level,
		});
	};

	/* Drag & Drop */

	const DRAG_DATA_TYPE = "game/tube"

	const dragStartHandler = (evt: DragEvent) => {
		evt.dataTransfer.setData(DRAG_DATA_TYPE, tube.id.toString())
		dispatchAction("tube-drag", {tubeId: tube.id})
	}

	const dropHanlder = (evt: DragEvent) => {
		dropping = false
		const sourceId = +evt.dataTransfer.getData(DRAG_DATA_TYPE)
		const targetId = tube.id
		dispatchAction("tube-drop", {
			sourceTubeId: sourceId, 
			targetTubeId: targetId
		})
		evt.preventDefault()
	}

	const dragEnter = (evt: DragEvent) => {
		if (evt.dataTransfer.types.includes(DRAG_DATA_TYPE)) {
			evt.preventDefault()
			if (selectable) {
				dropping = true
			}
		}
	}

	const dragOver = (evt: DragEvent) => {
		if (evt.dataTransfer.types.includes(DRAG_DATA_TYPE)) {
			evt.preventDefault()
		}
	}

	const dragLeave = (evt: DragEvent) => {
		if (evt.dataTransfer.types.includes(DRAG_DATA_TYPE)) {
			dropping = false
			evt.preventDefault()
		}
	}

</script>

<div class="tube-slot">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="tube"
		class:selected
		class:highlight
		data-selectable={selectable}
		class:dropping={dropping}
		class:unplugged={!tube.done}
		draggable="true"
		on:dragstart={dragStartHandler}
		on:dragenter={dragEnter}
		on:dragover={dragOver}
		on:dragleave={dragLeave}
		on:drop={dropHanlder}
	>
		<div class="plug" />
		{#each { length: 4 } as _, index}
			{#if index <= tube.levels.length}
				<div
					on:click={() => onClick(index)}
					class="waterblock"
					style:background-color="var(--clr-wtr{tube.levels[index]})"
					transition:fly|local={{
						y: -200,
						duration: 200,
						easing: linear,
					}}
				/>
			{:else}
				<div
					on:click={() => onClick(index)}
					class="waterblock"
					style:background-color="var(--clr-none)"
					transition:fly|local={{
						y: -200,
						duration: 200,
						easing: linear,
					}}
				/>
			{/if}
		{/each}
		<!--
		{#each tube.levels as level}
			<div on:click={() => onClick(level)}
				class="waterblock"
				style:background-color="var(--clr-wtr{level})"
				transition:fly|local={{ y: -200, duration: 200, easing: linear }}
			/>
		{/each}
		-->
	</div>
	<h4>{tube.name}</h4>
</div>

<style>
	.tube {
		width: clamp(2.5rem, 6vw, 3rem);
		height: 12rem;
		margin-inline: auto;
		display: flex;
		flex-direction: column-reverse;
		border: 2px solid white;
		border-radius: 0% 0% 100vw 100vw;
		overflow: hidden;
	}
	.tube.unplugged[data-selectable="true"]:hover,
	.tube.unplugged[data-selectable="true"].dropping {
		box-shadow: 0px 0px 6px 4px hsl(66.6, 100%, 75%);
	}
	.selected {
		transform: translateY(-2rem);
	}
	.tube.highlight {
		outline: dashed 0.25rem var(--clr-accent2);
		outline-offset: 0.5rem;
	}
	.waterblock {
		content: "";
		height: 25%;
	}
	.plug {
		order: 99;
		height: 0.75rem;
		width: 3rem;
		background-color: #604e42;
	}
	.unplugged .plug {
		visibility: hidden;
	}
	h4 {
		text-align: center;
		margin-block-start: 0.5rem;
		font-size: 1.25rem;
	}
</style>
