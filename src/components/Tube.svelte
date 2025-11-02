<script lang="ts">
    import type { Tube } from "../game/tube";
    import type { TubeClick, TubeDrag, TubeDragDrop } from "./events";

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

    const onClick = (evt: Event, level: number) => {
        evt.stopPropagation();
        console.debug(`[Tube] onClick(${level})`);
        onclick({ tubeId: tube.id, level: level });
    };

    let clickTimeout: number;
    function onMouseDown(evt: MouseEvent) {
        console.debug(`[Tube] onMouseDown(${evt})`);
        clickTimeout = setTimeout(() => {
            clickTimeout = null;
        }, 500);
    }

    function onMouseUp(evt: MouseEvent, level: number) {
        console.debug(`[Tube] onMouseUp(${level})`);
        if (clickTimeout) {
            clearTimeout(clickTimeout);
            clickTimeout = null;
            onclick({ tubeId: tube.id, level }); // single click
        }
    }

    /* Drag & Drop */

    const DRAG_DATA_TYPE = "game/tube";

    const dragStartHandler = (evt: DragEvent) => {
        console.debug("[Tube] dragStartHandler()");
        if (clickTimeout) {
            clearTimeout(clickTimeout);
            clickTimeout = null;
        }
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
        onmousedown={(event) => onMouseDown(event)}
        onmouseup={(event) => onMouseUp(event, -1)}
    >
        <div class="plug cylinder"></div>
        {#each { length: 4 } as _, index}
            {@const colorStyle =
                index < tube.levels.length
                    ? `--clr-wtr${tube.levels[index]}`
                    : "--clr-none"}
            <div
                onmousedown={(event) => onMouseDown(event)}
                onmouseup={(event) => onMouseUp(event, index)}
                class="waterblock cylinder {index >= tube.levels.length
                    ? 'empty'
                    : ''}"
                style:--color="var({colorStyle})"
            ></div>
        {/each}
    </div>
    <h4>{tube.name}</h4>
</div>

<style>
    /* basic block */
    .cylinder {
        --top-border-color: hsla(0 0% 100% / 0.1);
        background-color: var(--color, white);
        position: relative;
    }
    .cylinder::before {
        content: "";
        display: block;
        width: 100%;
        height: calc(var(--ellipse-height) / 2);
        position: absolute;
        top: 100%;
        background-color: var(--color);
        border-bottom-left-radius: 50% 100%;
        border-bottom-right-radius: 50% 100%;
    }
    .cylinder::after {
        content: "";
        display: block;
        background-color: var(--color);
        width: 100%;
        height: var(--ellipse-height);
        position: absolute;
        top: calc(var(--ellipse-height) / -2);
        border-radius: 50%;
        border-width: 2px;
        border-style: solid;
        border-color: var(--top-border-color);
    }
    /* tube container */
    .tube {
        --block-height: 48px;
        --ellipse-height: 1rem;
        --tube-border-width: 2px;
        --transition-duration: 0.2s;
        width: clamp(2.25rem, 6vw, 3rem);
        height: calc(var(--block-height) * 4 + var(--ellipse-height));
        padding-bottom: calc(var(--ellipse-height) / 2);
        margin-inline: auto;
        display: flex;
        flex-direction: column-reverse;
        border: var(--tube-border-width) solid white;
        border-radius: 50% / calc(var(--ellipse-height) / 2);
        box-shadow: var(--shadow-4);
        position: relative;
    }
    .tube.unplugged[data-selectable="true"]:hover,
    .tube.unplugged[data-selectable="true"].dropping {
        box-shadow: 0px 0px 6px 4px hsl(66.6, 100%, 75%);
    }
    /* reflection */
    .tube::before {
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
    .tube::after {
        content: "";
        width: 100%;
        height: var(--ellipse-height);
        position: absolute;
        top: calc(var(--tube-border-width) * -1);
        left: calc(var(--tube-border-width) * -1);
        z-index: 5;
        border-radius: 50% / calc(var(--ellipse-height) / 2);
        border: var(--tube-border-width) solid white;
        box-sizing: content-box;
    }
    .selected {
        transform: translateY(-2rem);
    }
    .tube.highlight {
        outline: dashed 0.25rem var(--clr-dark);
        outline-offset: 0.5rem;
    }
    .waterblock {
        height: var(--block-height);
        transition: height var(--transition-duration) ease-in;
    }
    .waterblock.empty {
        background-color: var(--clr-none);
        height: 0;
    }
    .plug {
        order: 99;
        z-index: 7;
        height: 1.25rem;
        --color: #772d10;
        --top-border-color: hsla(0 0% 0% / 0.2);
        transition-behavior: allow-discrete;
        transition: visibility 0s linear var(--transition-duration);
    }
    .plug::before {
        border-bottom: 1px solid var(--top-border-color);
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
