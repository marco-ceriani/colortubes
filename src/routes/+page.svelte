<script>
    import Tubes from '$lib/components/TubesContainer.svelte'
    import { moveWater } from '$lib/game/logic.js'

    const colors = ['orange', 'cyan', 'purple', 'brown', 'pink', 'red', 'dodgerblue', 'blue', 'green']

    let tubes = [
        ['brown', 'purple', 'cyan', 'orange'],
        ['red', 'pink', 'pink', 'pink'],
        ['dodgerblue', 'cyan', 'purple', 'cyan'],
        ['blue', 'dodgerblue', 'orange', 'brown'],
        ['brown', 'dodgerblue', 'purple', 'blue'],
        ['blue', 'dodgerblue', 'green', 'pink'],

        ['orange', 'red', 'purple', 'cyan'],
        ['red', 'green', 'brown', 'green'],
        ['red', 'blue', 'orange', 'green'],
        [],
        []
    ];    

    function onMoveWater(event) {
        const {from, to} = event.detail
        try {
            const res = moveWater(tubes[from], tubes[to])
            const newTubes = [...tubes]
            newTubes[from] = res[0]
            newTubes[to] = res[1]
            tubes = newTubes
        } catch (error) {
            console.log(error.message)
        }
    }
</script>

<Tubes tubes={tubes} on:move={onMoveWater} />
