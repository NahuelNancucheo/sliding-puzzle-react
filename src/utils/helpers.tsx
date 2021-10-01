import { TILE_COUNT } from './constants';

//verifies if is solvable
//TILE_COUNT = ROWS * COLS
export function isSolvable(tiles:number[]): boolean {
    let product = 1;
    for(let i = 1, l = TILE_COUNT - 1; i <= l; i++) {
        for(let j = i + 1, m = l + 1; j <= m; j++){
            product *= (tiles[i - 1] - tiles[j - 1]) / (i - j);
        }
    }
    return Math.round(product) === 1;
};

//check index positions
export function isSolved(tiles:number[]): boolean {
    for(let i = 0; i < tiles.length;  i++) {
        if(tiles[i] !== i) {
            return false;
        }
    }
    return true;
};

//get the row/col pair from a linear index.
export function getMatrixPosition(index:number, GRID_SIZE:number) {
    return {
        row: Math.floor(index / GRID_SIZE),
        col: index % GRID_SIZE
    };
};

//
export function getVisualPosition(row:number, col:number, width:number, height:number) {
    return {
      x: col * width,
      y: row * height,
    };
}

//shuffle Tiles
export function shuffle(tiles:number[]): number[] {
    const shuffledTiles = [
        ...tiles
        .filter((t) => t !== tiles.length - 1)
        .sort(() => Math.random() - 0.5),
        tiles.length -1
    ];
    return isSolvable(shuffledTiles) && !isSolved(shuffledTiles) ? shuffledTiles : shuffle(shuffledTiles)
};

//true if can swap, false if cannot
export function canSwap(src:number, dest:number, GRID_SIZE:number): boolean {
    const { row: srcRow, col:srcCol} = getMatrixPosition(src, GRID_SIZE);
    const { row: destRow, col:destCol} = getMatrixPosition(dest, GRID_SIZE);
    return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
};  

//swaps index positions
export function swap(tiles:number[], src:number, dest:number): number[]{
    const tilesResult = [...tiles];
    [tilesResult[src], tilesResult[dest]] = [tilesResult[dest], tilesResult[src]];
    return tilesResult;
};


