
export function distributeOnRows(tubes) {
    if (tubes.length <= 6) {
        return [tubes]
    }
    const numRows = tubes.length <= 14 ? 2 : 3;
    const numPerRow = Math.floor(tubes.length / numRows)

    const rows = [];
    for (let i = 0, j = 0; i < tubes.length; j++, i += numPerRow) {
        const extra = (j < tubes.length % numRows) ? 1 : 0
        rows.push(tubes.slice(i, i + numPerRow +extra));
        i += extra;
    }
    return rows;
}
