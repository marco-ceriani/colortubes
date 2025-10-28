<script lang="ts">
    import { Router } from "sv-router";
    import { p } from "./router";
</script>

<div class="root-container">
    <header>
        <h1>Color Water Tubes</h1>
    </header>

    <main>
        <Router base="#" />
    </main>
</div>

<style>
    header {
        text-align: center;
        font-size: clamp(1rem, 3vw, 1.5rem);
        margin-block: 0.75rem;
    }
    h1 {
        background: linear-gradient(
            180deg,
            var(--clr-accent) 40%,
            var(--clr-accent2) 70%
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .root-container {
        max-width: 50rem;
        height: 100%;
        display: grid;
        grid-template-rows: min-content 1fr min-content;
        margin-inline: auto;
        padding-inline: 1rem;
    }
</style>
