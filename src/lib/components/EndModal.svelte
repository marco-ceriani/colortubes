<script>
    import {fade} from 'svelte/transition'
    export let message
    export let result

    $: console.log(result)

    $: message = result === "win" ? "🏅 You Win 🏅" : "You lose 😞"
</script>

<div class="modal {result || ''}" transition:fade={{delay: 100}}>
    <h2>{message}</h2>
</div>

<style>
    .modal {
        --shadow-clr: grey;
        background-color: var(--clr-accent);
        color: var(--clr-dark);
        border: .35rem solid var(--clr-accent2);
        border-radius: .5rem;
        min-width: 25rem;
        min-height: 7rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.5rem;
        box-shadow: 1rem 0 10rem var(--shadow-clr);
    }
    .win {
        border-color: var(--clr-accent2);
        background-color: var(--clr-accent);
        --shadow-clr: var(--clr-accent);
    }
    .lose {
        background-color: hsl(0, 0%, 81.6%);
        border-color: var(--clr-dark);
        --shadow-clr: hsl(0, 0%, 40.0%);
    }
</style>