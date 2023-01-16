<script>
	export let href = null;
</script>

{#if href}
	<a class="button" {href} role="button"><slot /></a>
{:else}
	<button class="button" on:click><slot /></button>
{/if}

<style>
	.button {
		display: inline-flex;
        align-items: center;

		padding: 0.25em 0.875em;
        font-size: 1rem;
		text-decoration: none;
		background-color: hsl(0, 0%, 90%);
        background: linear-gradient(180deg, hsl(0, 0%, 95%) 0%, hsl(0, 0%, 72%) 100%);
        background-origin: border-box;
		color: var(--clr-dark);
		border-radius: 0.375em;
        border: none;
        cursor: pointer;
        touch-action: manipulation;


        box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25),
			inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);

	}
    .button:is(:focus, :hover) {
        box-shadow: 0px 0px .25em var(--clr-accent2),
			0px 0px 0px .25em var(--clr-accent);
    }
</style>
