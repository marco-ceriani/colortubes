<script lang="ts">
    import TubeComponent from "./Tube.svelte";
    import { distributeOnRows } from "./tubesLayout";

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

    let rows = $derived(distributeOnRows(tubes));
</script>

<div class="tubes-container">
    {#each rows as row}
        <div class="tubes-row">
            {#each row as tube (tube.id)}
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
    {/each}
</div>

<style>
    .tubes-row {
        display: flex;
        justify-content: space-around;
        margin-block: 3rem;
    }
</style>
