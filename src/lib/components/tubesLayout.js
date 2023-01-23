
export function distributeOnRows(tubes) {
    const numPerRow =
        tubes.length <= 6
            ? tubes.length
            : tubes.length <= 14
            ? (tubes.length + 1) / 2
            : 5;

    const rows = [];
    for (let i = 0; i < tubes.length; i += numPerRow) {
        rows.push(tubes.slice(i, i + numPerRow));
    }
    return rows;
}
