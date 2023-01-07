<div class="root-container">
    
    <header>
        <h1>Color Water Tubes</h1>
    </header>
    
    <main>
        <slot />
    </main>
</div>

<style>
    .root-container {
        max-width: 50rem;
        height: 100%;
        display: grid;
        grid-template-rows: min-content 1fr min-content;
        margin-inline: auto;
        padding-inline: 1rem;
    }
</style>