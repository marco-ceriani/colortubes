<script>
    export let message
</script>

<div class="modal">
    <h2>{message}</h2>
</div>

<style>
    div.modal {
        background-color: hsl(0 0% 80% / .7);
        color: var(--clr-dark);
        border: .25rem solid var(--clr-dark);
        min-width: 25rem;
        min-height: 7rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>