import { createRouter } from "sv-router";
import Home from "./routes/Home.svelte"
import GameUI from "./routes/GameUI.svelte"
import EditPage from "./routes/EditPage.svelte"

export const { p, navigate, isActive, route } = createRouter({
    '/': Home,
    '/game': GameUI,
    '/edit': EditPage,
});
