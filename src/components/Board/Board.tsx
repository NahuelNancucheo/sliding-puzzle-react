import React from 'react';
import { BOARD_SIZE, GRID_SIZE, TILE_COUNT } from '../../utils/constants';
import { useState } from 'react';
import { Tile } from '../Tile/Tile';
import { canSwap, shuffle, swap, isSolved } from '../../utils/helpers';
import styles from './Board.module.css';

export const Board: React.FC = () => {
    const [tiles, setTiles] = useState<number[]>([...Array(TILE_COUNT).keys()]);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0)

    const hasWon = isSolved(tiles)
   
    const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
    const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);

    const boardStyle = {
        width: BOARD_SIZE,
        height: BOARD_SIZE
    };

    //set shuffle tiles
    const shuffleTiles = () => {
        const shuffledTiles = shuffle(tiles)
        setTiles(shuffledTiles);
    }
    
    //swap function
    const swapTiles = (tileIndex:number) => {
        if(canSwap(tileIndex, tiles.indexOf(tiles.length - 1), GRID_SIZE)) {
            //console.log('tiles estado: ', tiles);
            setCount(count + 1)
            const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1));
            //console.log(swappedTiles); 
            setTiles(swappedTiles);
        }
    }
    
    //handle click swap
    const handleTileClick = (index:number) => {
        swapTiles(index)
    }

    //first shuffle
    const handleStartClick = () => {
        shuffleTiles();
        setIsStarted(true);
    }

    //shuffle again
    const handleShuffleClick = () => {
        setCount(0);
        shuffleTiles();
    }

    //resolve puzzle
    const handleOrderClick = () => {
        setCount(0);
        setTiles([...Array(TILE_COUNT).keys()]);
    }

    return (
        <>
            <h3>Moves: {count}</h3>
            <ul className={styles.board} style={boardStyle}>
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
                (<button onClick={() => handleStartClick()}>Shuffle and start play</button>) : 
                (<button onClick={() => handleShuffleClick()}>Shuffle again</button>)}
            {/*!hasWon && isStarted && <button onClick={() => handleOrderClick()} >Resolve puzzle</button>*/}
        </>
    )
}


