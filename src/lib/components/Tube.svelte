<script>
	import { fly } from 'svelte/transition';
	import { linear } from 'svelte/easing';
	export let tube;
	export let selected = false;
	export let highlight = false;
	export let selectable;
</script>

<div class="tube-slot">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="tube" class:selected class:highlight {selectable} class:unplugged={!tube.done} on:click>
		<div class="plug" />
		{#each tube.levels as level}
			<div
				class="waterblock"
				style:background-color="var(--clr-wtr{level})"
				transition:fly|local={{ y: -200, duration: 200, easing: linear }}
			/>
		{/each}
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
	.tube.unplugged[selectable='true']:hover {
		box-shadow: 0px 0px 6px 4px hsl(66.6, 100%, 75%);
	}
	.selected {
		transform: translateY(-2.0rem);
	}
    .tube.highlight {
        outline: dashed .25rem var(--clr-accent2);
        outline-offset: .5rem;
    }
	.waterblock {
		content: '';
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
