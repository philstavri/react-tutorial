import React from 'react';
import Square from "../Square";

class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}

                {...this.prop}
            />
        );
    }

    render() {

        let gridSize = 3;
        let squareIndex = 0;
        let rows = [];

        for( let i = 0; i < gridSize; i++){
            let cols = [];
            for( let j = 0; j < gridSize; j++){
                cols.push(this.renderSquare(squareIndex++))
            }

            rows.push(
                <div className="board-row" key={i}>
                    {cols}
                </div>
            );
        }

        return (
            <div>
                {rows}
            </div>
        );
    }
}

export default Board;