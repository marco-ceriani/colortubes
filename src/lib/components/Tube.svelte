<script>
    import { fly } from 'svelte/transition';
    import { linear } from 'svelte/easing';
    export let tube;
    export let selected = false;
    export let selectable;
</script>

<div class="tube-slot">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="tube" class:selected={selected} {selectable} class:unplugged={!tube.done} on:click>
        <div class="plug"></div>
        {#each tube.levels as level}
            <div class="waterblock" style:background-color="var(--clr-wtr{level})" transition:fly={{y: -200, duration: 200, easing: linear}}></div>
        {/each}
    </div>
    <h4>{tube.name}</h4>
</div>

<style>
    .tube {
        width: 3rem;
        height: 12rem;
        margin-inline: auto;
        display: flex;
        flex-direction: column-reverse;
        border: 2px solid white;
        border-radius: 0% 0% 100vw 100vw;
        overflow: hidden;
    }
    .tube.unplugged[selectable=true]:hover {
        box-shadow: 0px 0px 6px 4px hsl(66.6, 100%, 75%);
    }
    .selected {
        transform: translateY(-1.5rem) rotate(-5deg);
    }
    .waterblock {
        content: "";
        height: 25%;
    }
    .plug {
        order: 99;
        height: 0.75rem;
        width: 3rem;
        background-color: #604E42;
    }
    .unplugged .plug {
        visibility: hidden;
    }
    h4 {
        text-align: center;
        margin-block-start: 0.5rem;
        font-size: 1.25rem;
    }
</style>
