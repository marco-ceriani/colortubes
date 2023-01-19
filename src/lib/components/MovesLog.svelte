<script>
    export let title = 'Moves'
    export let moves = [];
</script>

<div class="log">
    <h3>{title}</h3>
    <ol>
        {#each moves as move}
            <li>
                <span class="amount" style:background-color="var(--clr-wtr{move.color})">{move.amount}</span> from {move.fromId} to {move.toId}</li>
        {/each}
    </ol>
</div>

<style>
    .log {
        min-width: 16ch;
    }
    li {
        margin-block: .25rem;
    }
    .amount {
        color: var(--clr-dark);
        border-radius: 100vw;
        display: inline-block;
        width: 1.1em;
        line-height: 1.1em;
        text-align: center;
        margin-inline-end: .3em;
    }
</style>