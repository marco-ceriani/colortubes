<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children?: Snippet;
    }

    let { children }: Props = $props();
</script>

<div>
    {@render children?.()}
</div>

<style>
    div {
        display: flex;
        gap: clamp(0.5rem, 8vw, 1rem);
        margin-block: 0.25rem;
        justify-content: center;
    }
</style>
