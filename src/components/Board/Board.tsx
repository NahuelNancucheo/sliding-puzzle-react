import React from 'react';
import { BOARD_SIZE, GRID_SIZE, TILE_COUNT } from '../../utils/constants';
import { useState, useEffect } from 'react';
import { Tile } from '../Tile/Tile';
import { canSwap, shuffle, swap, isSolved } from '../../utils/helpers';

export const Board: React.FC = () => {
    const [tiles, setTiles] = useState<number[]>([...Array(TILE_COUNT).keys()]);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0)
    const hasWon = isSolved(tiles)
   
    const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
    const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);

    const style = {
        width: BOARD_SIZE,
        height: BOARD_SIZE
    };

    const shuffleTiles = () => {
        const shuffledTiles = shuffle(tiles)
        setTiles(shuffledTiles);
    }

    const swapTiles = (tileIndex:number) => {
        if(canSwap(tileIndex, tiles.indexOf(tiles.length - 1), GRID_SIZE)) {
            console.log(tiles);
            setCount(count + 1)
           const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1));
           console.log(swappedTiles); 
           
           setTiles(swappedTiles);
        }
    }

    const handleTileClick = (index:number) => {
        swapTiles(index)
    }

    const handleShuffleClick = () => {
        shuffleTiles()
    }

    const handleStartClick = () => {
        shuffleTiles();
        setIsStarted(true);
    }
    

    return (
        <>
            <h3>Moves: {count}</h3>
            <ul className="board" style={style}>
                {tiles.map((tile, index) => {
                    return (
                    <Tile
                        key={tile}
                        index={index}
                        tile={tile}
                        width={pieceWidth}
                        height={pieceHeight}
                        handleTileClick={handleTileClick}
                    />
                    )})}
            </ul> 

            {hasWon && isStarted && <span>🎉🎉 Puzzle solved! 🎉🎉</span>}
            {!isStarted ? 
                (<button onClick={() => handleStartClick()}>Shuffle</button>) : 
                (<button onClick={() => handleShuffleClick()}>Shuffle again</button>)}
        </>
    )
}


