<script>
    export let title = 'Moves'
    export let moves = [];
</script>

<div class="log">
    <h3>{title}</h3>
    <ol>
        {#each moves as move}
            <li><span style:color="var(--clr-{move.color})">{move.color}</span> from {move.fromId} to {move.toId}</li>
        {/each}
    </ol>
</div>
