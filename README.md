# Colortubes

This project is my attempt to recreate a web version of a category of mobile games that can be found in many variants in app stores.

![Screenshot of the game](/docs/screenshot.jpg)


## Features

- Random games generation
- Custom games designer
- Automatic puzzle resolution to provide hints
- Point and click, or drag and drop, choose your play style

## Technical details

The application is implemented as a Single Page Application using Svelte, in TypeScript. Since it's a single player game, it doesn't have a backend, and uses a client side router to switch between game mode and editing mode.

The game supports between a minimum of 5 tubes to a maximum of 20. To distribute them equally over multiple lines, a custom grid is implemented, which computes the number of lines depending on the number of items. The most complex component is the Tube, which is the one mostly depending on application state, and also supports both drag and drop and clicks. The rest of the components are defined to apply custom styles to the base HTML elements.

The automatic puzzle resolution feature is implemented running the algorithm in background using a WebWorker, because it takes a few seconds to compute a good solution. The algorithm is based on [Monte Carlo Tree Search](https://en.wikipedia.org/wiki/Monte_Carlo_tree_search). This is a heuristic search algorithm that works really well in games with two or more players, even with unkown info (e.g. card games). This is a single player game, with only known info, hence better search algorithms may exist. However, the plain MCTS algorithm can be applied to any game for which you can simulate a random match until the end, without the need to provide custom hints based on the game rules, or an evaluation function to estimate the goodness of each game state.

## Root causes

The second reason to start this project was to do train my skills in Svelte a few weeks after following a course. The third reason was to have an excuse for using the MCTS algorith, which was in my bookmars since a few years.

The main reason was to get an automatic solver, and quickly complete a few hundred games in a similar android game, to earn chamsims on Idol Champ. For the same reason, the color palette is based on the three colors black, yellow and dark red, which are the official InSomnia colors.
