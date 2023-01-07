<script>
    export let moves = [];
</script>

<h3>Moves</h3>
<ol>
	{#each moves as move}
		<li>{move}</li>
	{/each}
</ol>
