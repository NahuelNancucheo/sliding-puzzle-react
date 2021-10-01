import React from 'react';
import { BG_IMG, BOARD_SIZE, GRID_SIZE, TILE_COUNT } from '../../utils/constants';
import { getMatrixPosition, getVisualPosition } from '../../utils/helpers';


interface IProps {
    index: number
    tile: number
    width: number
    height:number
    handleTileClick: any
}

export const Tile: React.FC<IProps> = ({ index, tile, width, height, handleTileClick }) => {
    const {row, col} = getMatrixPosition(index, GRID_SIZE);
    const visualPos = getVisualPosition(row, col, width, height);

    const tileStyle = {
        width:`calc(100% / ${GRID_SIZE})`,
        height:`calc(100% / ${GRID_SIZE})`,
        cursor:`pointer`,
        translateX: visualPos.x,
        translateY: visualPos.y,
        backgroundImage:`url(${BG_IMG})`,
        backgroundSize:`${BOARD_SIZE * 1.25}px`,
        backgroundPosition:`${(100 / GRID_SIZE) * (tile % GRID_SIZE)}% ${(100 / GRID_SIZE) * (Math.floor(tile / GRID_SIZE))}%`
    }

    return (
        <li
            className="tile"
            style={{
                ...tileStyle,
                transform: `translate3d(${tileStyle.translateX}px, ${tileStyle.translateY}px, 0)`,
                //last tile is hidden
                opacity: tile === TILE_COUNT - 1 ? 0 : 1
            }}
            onClick={() => handleTileClick(index)}
        >
            {tile + 1}
        </li>
    )
}
