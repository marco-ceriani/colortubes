<script lang="ts">
    interface Props {
        href?: string;
        disabled?: boolean;
        spin?: boolean;
        children?: import("svelte").Snippet;
        onclick?: (event: Event) => void;
    }

    let {
        href = null,
        disabled = false,
        spin = false,
        children,
        onclick,
    }: Props = $props();
</script>

{#if href}
    <a {href} class="button" role="button">{@render children?.()}</a>
{:else}
    <button class="button" {disabled} class:spinning={spin} {onclick}>
        {#if !spin}
            {@render children?.()}
        {/if}
    </button>
{/if}

<style>
    /* f2c763 ->  hsl(42, 85, 67), rgb(242, 199, 99) */
    /* 8a2a2b -> hsl(359, 53%, 35%) */
    :global(.button) {
        display: inline-flex;
        align-items: center;
        position: relative;

        padding: 0.25em 0.875em;
        font-size: 1rem;
        text-decoration: none;
        background-color: hsl(0, 0%, 90%);
        /*background: linear-gradient(
            180deg,
            hsl(0, 0%, 95%) 0%,
            hsl(0, 0%, 72%) 100%
        );*/
        background-origin: border-box;
        color: var(--clr-dark);
        border-radius: 0.375em;
        border: none;
        cursor: pointer;
        touch-action: manipulation;
        /*box-shadow: 0 6px 16px hsla(359, 53%, 35%, 0.45);*/
        /*box-shadow:
            0 0 5px hsla(42, 85%, 67%, 0.5),
            0 0 10px hsla(42, 85%, 67%, 0.5);*/
        box-shadow:
            0 0 5px hsla(359, 53%, 35%, 0.5),
            0 0 10px hsla(359, 53%, 35%, 0.5);
    }
    :global(.button:is(:focus-visible, :hover):not([disabled])) {
        outline: none;
        box-shadow:
            0px 0px 0.25em var(--clr-accent2),
            0px 0px 0px 0.25em var(--clr-accent);
    }
    :global(.button:active) {
        background-color: var(--clr-accent);
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
