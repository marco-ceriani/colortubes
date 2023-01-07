function topColor(tube) {
    return tube[tube.length - 1]
}

function countTopSibling(tube) {
    if (tube.length < 2) {
        return tube.length;
    }
    const top = tube[tube.length - 1];
    const num = 1;
    while (num < tube.length) {
        if (tube[tube.length - 1 -num] != top) {
            return num;
        }
        num += 1
    }
    return tube.length;
}

export function moveWater(from, to) {
    if (isTubeEmpty(from) || isDone(from)) {
        throw Error('source-invalid');
    }
    if (isTubeFull(to)) {
        throw Error('target-full');
    }
    const color = topColor(from);
    
    if (to.length > 0 && color !== topColor(to)) {
        throw Error('invalid-color');
    }
    const first = from.slice(0, -1);
    const second = [...to, color];
    return [first, second];
}

export function isDone(tube) {
    if (tube.length < 4) {
        return false;
    }
    return tube[0] === tube[1] && tube[1] === tube[2] && tube[2] == tube[3];
}

function isTubeEmpty(tube) {
    return tube.length === 0;
}

function isTubeFull(tube) {
    return tube.length >= 4;
}

