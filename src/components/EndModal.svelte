<script lang="ts">
    interface Props {
        result: boolean;
    }

    let { result }: Props = $props();

    let cssClass = $derived(result ? "win" : "lose");

    let message = $derived(result ? "You Win" : "You Lose");
</script>

<dialog class="modal {cssClass}" open>
    <h2>{message}</h2>
</dialog>

<style>
    .modal {
        --shadow-clr: grey;
        width: min(25rem, 90%);
        background-color: var(--clr-accent);
        border: 0.35rem solid var(--clr-accent2);
        border-radius: 0.5rem;
        box-shadow: 0rem 0.1rem 5rem var(--shadow-clr);

        font-size: 1.5rem;
        color: var(--clr-dark);

        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: center;

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
    }
    .win {
        border-color: var(--clr-accent2);
        background-color: var(--clr-accent);
        --shadow-clr: var(--clr-accent);

        &::before,
        &::after {
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
