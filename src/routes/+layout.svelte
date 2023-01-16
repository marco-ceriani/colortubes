<div class="root-container">
	<header>
		<h1>Color Water Tubes</h1>
	</header>

	<main>
		<slot />
	</main>
</div>

<style>
	header {
		text-align: center;
		font-size: 1.25rem;
		margin-block: 0.75rem;
	}
	h1 {
		background: linear-gradient(180deg, var(--clr-accent) 50%, var(--clr-accent2) 75%);
        background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.root-container {
		max-width: 50rem;
		height: 100%;
		display: grid;
		grid-template-rows: min-content 1fr min-content;
		margin-inline: auto;
		padding-inline: 1rem;
	}
</style>
