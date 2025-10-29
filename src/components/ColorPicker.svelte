<script lang="ts">
    import { NUM_COLORS } from "../game/game.js";

    interface Props {
        counts?: { [key: number]: number };
        onColorPick: (color: number) => void;
    }

    let { counts = {}, onColorPick }: Props = $props();

    const colors = Array(NUM_COLORS)
        .fill(null)
        .map((_, i) => i + 1);
    let selected: number = $state(null);

    function selectColor(color: number) {
        selected = color;
        onColorPick(color);
    }
</script>

<div class="palette">
    {#each colors as color}
        <button
            onclick={() => selectColor(color)}
            class="cell"
            class:curr={color === selected}
            class:extra={counts[color] > 4}
            style:--color="var(--clr-wtr{color >= 0 ? color : '-none'})"
        >
            {counts[color] || ""}
        </button>
    {/each}
    <button
        onclick={() => selectColor(null)}
        class="cell empty"
        class:curr={null === selected}
        style:--color="var(--clr-wtr-none)"
        aria-label="No Color"
    >
    </button>
</div>

<style>
    .palette {
        display: flex;
        flex-flow: row wrap;
        max-width: 36rem;
    }
    .cell {
        width: 2.5rem;
        height: 1.8rem;
        border: 1px solid white;
        display: inline-block;
        background-color: var(--color);
        position: relative;
    }
    .curr {
        outline: black solid 0.125rem;
        outline-offset: -0.25rem;
    }
    .curr.empty {
        outline: white solid 0.125rem;
        outline-offset: -0.25rem;
    }
    .empty:before,
    .empty:after {
        content: "";
        width: 75%;
        height: 0.125rem;
        background-color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) rotate(-36deg);
    }
    .empty:before {
        transform: translateX(-50%) rotate(36deg);
    }
    .extra {
        outline: red solid 0.25rem;
        outline-offset: -0.25rem;
    }
</style>
