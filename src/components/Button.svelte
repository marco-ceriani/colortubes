<script lang="ts">
    import { Link } from 'svelte-routing';

    export let href: string = null;
    export let disabled = false;
    export let spin = false;

</script>

{#if href}
    <Link to={href} class="button" role="button"><slot /></Link>
{:else}
	<button class="button" {disabled} class:spinning={spin} on:click>
        {#if !spin}
        <slot />
        {/if}
    </button>
{/if}

<style>
	:global(.button) {
		display: inline-flex;
        align-items: center;
        position: relative;

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
    :global(.button:is(:focus-visible, :hover):not([disabled])) {
        box-shadow: 0px 0px .25em var(--clr-accent2),
			0px 0px 0px .25em var(--clr-accent);
    }
    :global(.button:disabled) {
        background: hsl(0, 0%, 50%);
        cursor: default;
    }
    :global(.button.spinning::after) {
        content: "";
        position: absolute;
        width: 16px;
        height: 16px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        border: 4px solid transparent;
        border-top-color: #ffffff;
        border-radius: 50%;
        animation: button-loading-spinner 1s ease infinite;
    }

    @keyframes button-loading-spinner {
        from {
            transform: rotate(0turn);
        }

        to {
            transform: rotate(1turn);
        }
    }

</style>
