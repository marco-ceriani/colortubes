<script>
    export let levels = []
    export let selected = false;
    export let closed = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="whole-tube" class:selected={selected} on:click>
    <div class="plug" class:unplugged={!closed}></div>
    <div class="tube">
        {#each levels as level}
            <div class="waterblock" style:background-color={level}></div>
        {/each}
    </div>
</div>

<style>
    .whole-tube {
        height: 13rem;
        margin-bottom: 0;
    }
    .tube {
        width: 3rem;
        height: 12rem;
        display: flex;
        flex-direction: column-reverse;
        border: 2px solid white;
        border-radius: 0% 0% 100vw 100vw;
        overflow: hidden;
    }
    .tube:hover {
        box-shadow: 0px 0px 6px 4px hsl(66.6, 100%, 60%);
    }
    .selected {
        transform: translateY(-1.5rem) rotate(-5deg);
    }
    .waterblock {
        content: "";
        height: 25%;
    }
    .plug {
        height: 0.75rem;
        width: 3rem;
        background-color: #604E42;
    }
    .plug.unplugged {
        visibility: hidden;
    }
</style>
