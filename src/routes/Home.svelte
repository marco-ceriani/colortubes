<script lang="ts">
    import { p, navigate } from "../router";
    import { GameState, currentGame, randomGame } from "../game/game";

    function startGame() {
        currentGame.set(randomGame());
        navigate("/game");
    }
</script>

<div>
    <header>
        <h1>Color Water Tubes</h1>
    </header>
    <main>
        <button onclick={startGame} class="big-btn">New Game</button>
        <a href={p("/edit")} class="big-btn">Custom Level</a>
    </main>
</div>

<style>
    header {
        text-align: center;
        font-size: clamp(1rem, 3vw, 1.5rem);
        margin-block-start: 2rem;
        margin-block-end: 4rem;
        margin-inline: auto;
        color: var(--clr-accent);
        background-color: var(--clr-dark);
        max-width: 40ch;
        border-radius: 100vw;
    }
    main {
        display: grid;
        grid-template-columns: auto auto;
        gap: 1rem;
        max-width: 40rem;
        margin-inline: auto;
        justify-items: center;
    }
    .big-btn {
        --_height: 17vh;
        width: 90%;
        height: var(--_height);
        background-color: var(--clr-accent);
        border-radius: 1rem;
        text-align: center;
        line-height: var(--_height);
        color: var(--clr-dark);
        font-size: clamp(1rem, 4vw, 1.5rem);
        text-decoration: none;
        outline: none;
        border: none;

        box-shadow: rgba(0, 0, 0, 0.2) 15px 28px 25px -18px;

        &:hover,
        &:focus-visible {
            box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px -5px;
            transform: translate3d(0, 2px, 0);
        }
        &:focus {
            box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 4px -6px;
        }
    }
</style>
