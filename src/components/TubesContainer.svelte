<script lang="ts">
    import TubeComponent from "./Tube.svelte";

    import type { TubeClick, TubeDrag, TubeDragDrop } from "./events";
    import type { Tube } from "../game/tube";
    interface Props {
        tubes: Tube[];
        enabled: boolean[];
        selectedId?: number;
        highlightId?: number;
        onclick: (e: TubeClick) => void;
        ondrag?: (e: TubeDrag) => void;
        ondrop?: (e: TubeDragDrop) => void;
    }

    let {
        tubes,
        enabled,
        selectedId = null,
        highlightId = null,
        onclick,
        ondrag,
        ondrop,
    }: Props = $props();
</script>

<div class="tubes-container">
    {#each tubes as tube}
        <TubeComponent
            {tube}
            selected={selectedId === tube.id}
            selectable={enabled[tube.id]}
            highlight={highlightId === tube.id}
            {onclick}
            {ondrag}
            {ondrop}
        />
    {/each}
</div>

<style>
    .tubes-container {
        margin-top: 1rem;
        display: grid;
        grid-auto-columns: 1fr;
        grid-auto-flow: dense;
    }
    :global(.tubes-container > .tube-slot) {
        --num-rows: 1;
        grid-row: calc(
            round(
                up,
                sibling-index() / round(up, sibling-count() / var(--num-rows))
            )
        );
    }
    :global(.tubes-container:has(> :nth-child(7)) > .tube-slot) {
        --num-rows: 2;
    }
    :global(.tubes-container:has(> :nth-child(15)) > .tube-slot) {
        --num-rows: 3;
    }
</style>
