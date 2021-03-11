import React, { useState } from 'react';

import grid from './grid.json';

// import as an "any" to get around some typechecking
const gridDefs = require('./gridDefs.json');

type Props = {
    rows: number,
    cols: number,
    tileSize: number
}

export default function MapGrid(props: Props) {
    const { rows, cols, tileSize } = props;

    const [focus, setFocus] = useState<[number, number] | null>(null);
    const gridChar = focus == null ? '.' : grid[focus[0]].charAt(focus[1]);

    const focusTile = gridDefs[gridChar];

    function makeRects(rows: number, cols: number, size: number) {
        const out = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const ch = grid[row][col];
                out.push(
                    <rect
                        x={col * size}
                        y={row * size}
                        width={size}
                        height={size}
                        onMouseOver={() => setFocus([row, col])}
                        onClick={() => console.log([row, col])}
                        style={{
                            fill: gridDefs[ch].color,
                            stroke: 'rgba(0, 0, 0, 0.3)'
                        }}
                    />
                )
            }
        }
        return out;
    }

    return (
        <div style={{ border: '1px solid white' }}>
            <svg
                height={rows * tileSize}
                width={cols * tileSize}
                style={
                    {
                        border: '1px solid white',
                        margin: '10px'
                    }
                }
                onMouseLeave={() => setFocus(null)}
            >
                {makeRects(rows, cols, tileSize)}
            </svg>
            <div style={
                {
                    fontSize: '18px',
                    fontFamily: 'Raleway',
                    fontWeight: 300,
                    color: 'white',
                    margin: '0px 10px 10px 10px'
                }
            }>
                {focus == null ? 'Hover over the map' : focusTile.name}
            </div>
            <div style={
                {
                    fontSize: '14px',
                    fontFamily: 'Raleway',
                    fontWeight: 300,
                    color: 'white',
                    margin: '0px 10px 10px 10px'
                }
            }>
                {focus == null ? ' ' : focusTile.description}
            </div>
        </div>
    );
}