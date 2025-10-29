<script lang="ts">
    import type { Tube } from "../game/tube";
    import type { TubeClick, TubeDrag, TubeDragDrop } from "./events";

    import { fly } from "svelte/transition";
    import { linear } from "svelte/easing";

    interface Props {
        tube: Tube;
        selected?: boolean;
        highlight?: boolean;
        selectable: boolean;
        onclick: (e: TubeClick) => void;
        ondrag?: (e: TubeDrag) => void;
        ondrop?: (e: TubeDragDrop) => void;
    }

    let {
        tube,
        selected = false,
        highlight = false,
        selectable,
        onclick,
        ondrag,
        ondrop,
    }: Props = $props();
    let dropping = $state(false);

    const onClick = (level: number) => {
        onclick({ tubeId: tube.id, level: level });
    };

    /* Drag & Drop */

    const DRAG_DATA_TYPE = "game/tube";

    const dragStartHandler = (evt: DragEvent) => {
        evt.dataTransfer.setData(DRAG_DATA_TYPE, tube.id.toString());
        ondrag?.({ tubeId: tube.id });
    };

    const dropHanlder = (evt: DragEvent) => {
        dropping = false;
        const sourceId = +evt.dataTransfer.getData(DRAG_DATA_TYPE);
        const targetId = tube.id;
        ondrop?.({ sourceTubeId: sourceId, targetTubeId: targetId });
        evt.preventDefault();
    };

    const dragEnter = (evt: DragEvent) => {
        if (evt.dataTransfer.types.includes(DRAG_DATA_TYPE)) {
            evt.preventDefault();
            if (selectable) {
                dropping = true;
            }
        }
    };

    const dragOver = (evt: DragEvent) => {
        if (evt.dataTransfer.types.includes(DRAG_DATA_TYPE)) {
            evt.preventDefault();
        }
    };

    const dragLeave = (evt: DragEvent) => {
        if (evt.dataTransfer.types.includes(DRAG_DATA_TYPE)) {
            dropping = false;
            evt.preventDefault();
        }
    };
</script>

<div class="tube-slot">
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div
        class="tube"
        class:selected
        class:highlight
        data-selectable={selectable}
        class:dropping
        class:unplugged={!tube.done}
        draggable="true"
        ondragstart={dragStartHandler}
        ondragenter={dragEnter}
        ondragover={dragOver}
        ondragleave={dragLeave}
        ondrop={dropHanlder}
    >
        <div class="plug"></div>
        {#each { length: 4 } as _, index}
            {@const colorStyle =
                index <= tube.levels.length
                    ? `--clr-wtr${tube.levels[index]}`
                    : "--clr-none"}
            <div
                onclick={() => onClick(index)}
                class="waterblock"
                style:background-color="var({colorStyle})"
                transition:fly|local={{
                    y: -200,
                    duration: 200,
                    easing: linear,
                }}
            ></div>
        {/each}
    </div>
    <h4>{tube.name}</h4>
</div>

<style>
    .tube {
        width: clamp(2.25rem, 6vw, 3rem);
        height: 12rem;
        margin-inline: auto;
        display: flex;
        flex-direction: column-reverse;
        border: 2px solid white;
        border-radius: 0% 0% 100vw 100vw;
        overflow: hidden;
        box-shadow: var(--shadow-4);
        position: relative;
    }
    .tube.unplugged[data-selectable="true"]:hover,
    .tube.unplugged[data-selectable="true"].dropping {
        box-shadow: 0px 0px 6px 4px hsl(66.6, 100%, 75%);
    }
    /* reflection */
    .tube::after {
        content: "";
        display: inline-block;
        position: absolute;
        top: 15%;
        right: 9%;
        width: 0.2rem;
        height: 50%;
        background-color: hsla(51.2, 100%, 92%, 0.2);
        border-radius: 100vw;
    }
    .selected {
        transform: translateY(-2rem);
    }
    .tube.highlight {
        outline: dashed 0.25rem var(--clr-dark);
        outline-offset: 0.5rem;
    }
    .waterblock {
        content: "";
        height: 25%;
    }
    .plug {
        order: 99;
        height: 0.75rem;
        width: 3rem;
        background-color: #8f3511;
        border-bottom: 0.15rem solid #532411;
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
