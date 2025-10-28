import { createRouter } from "sv-router";
import GameUI from "./routes/GameUI.svelte"
import EditPage from "./routes/EditPage.svelte"

export const { p, navigate, isActive, route } = createRouter({
    '/': GameUI,
    '/edit': EditPage,
});
