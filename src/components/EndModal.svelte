<script lang="ts">
    import { onMount } from "svelte";

    interface Props {
        result: boolean;
        onclose?: (action: "new-game" | "quit") => void;
    }

    let { result, onclose }: Props = $props();

    let cssClass = $derived(result ? "win" : "lose");

    let message = $derived(result ? "You Win" : "You Lose");
    let dialog: HTMLDialogElement = $state();

    onMount(() => {
        dialog.showModal();
    });
</script>

<dialog class={cssClass} bind:this={dialog}>
    <h2>{message}</h2>
    <div class="btn-group">
        <button onclick={() => onclose("new-game")}>New game</button>
        <button onclick={() => onclose("quit")}>Quit</button>
    </div>
</dialog>

<style>
    dialog {
        --shadow-clr: grey;
        width: min(25rem, 90%);
        background-color: var(--clr-accent);
        border: 0.35rem solid var(--clr-accent2);
        border-radius: 0.5rem;
        box-shadow: 0rem 0.1rem 5rem var(--shadow-clr);
        padding-block: 1.5rem;

        position: fixed;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%) scale(1);

        transition-behavior: allow-discrete;
        transition-duration: 0.4s;
        transition-property: transform;

        @starting-style {
            transform: translate(-50%, -50%) scale(0.2);
        }

        h2 {
            color: var(--clr-dark);
            text-align: center;
            margin-block-end: 2rem;
            font-size: 2.5rem;
        }
    }
    .btn-group {
        display: flex;
        justify-content: center;
        gap: 1rem;

        button {
            min-width: 10ch;
        }
    }
    .win {
        border-color: var(--clr-accent2);
        background-color: var(--clr-accent);
        --shadow-clr: var(--clr-accent);

        h2::before,
        h2::after {
            content: "🏅";
        }
    }
    .lose {
        background-color: hsl(0, 0%, 81.6%);
        border-color: var(--clr-dark);
        --shadow-clr: hsl(0, 0%, 40%);

        &::before,
        &::after {
            content: "😞";
        }
    }
</style>
