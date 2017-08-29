import React from "react";
import Board from "../board/Board";

class Game extends React.Component {

    constructor() {
        super();

        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true
        };
    }

    getNextMove() {
        return this.state.xIsNext ? "X" : "O";
    }

    handleClick(i) {
        let history = this.state.history.slice(0, this.state.stepNumber + 1);
        let current = history[this.state.stepNumber];
        let squares = current.squares.slice();

        if (current.winner || squares[i]) {
            return;
        }

        squares[i] = this.getNextMove();
        let winner = calculateWinner(squares);
        this.setState({
            history: history.concat([{ squares, winner }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        let history = this.state.history.slice();
        let current = history[this.state.stepNumber];
        let winner = current.winner;

        if (this.state.reverseMoves) {
            history.reverse();
        }

        let moves = history.map((step, move) => {

            let prevStep = history[move - 1];
            if (this.state.reverseMoves) {
                prevStep = history[move + 1];
                move = history.length - (move + 1);
            }

            let desc = "Game start";

            if(move && prevStep) {
                let coordinatesOfChange = getCoordinatesOfChange(step.squares, prevStep.squares);
                if(coordinatesOfChange){
                    desc = `Move (${coordinatesOfChange.col},${coordinatesOfChange.row})`;
                }
            }

            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>
                        { move === this.state.stepNumber ? (
                            <b>{desc}</b>
                        ) : (
                            desc
                        )}
                    </a>
                </li>

            );
        });

        let status;

        if (winner) {
            status = `Winner ${winner.player}`;
        } else {
            status = `Next player: ${this.getNextMove()}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{ status }</div>
                    <ol>{moves}</ol>
                </div>
                <button onClick={() => this.toggleMovesList()}>Toggle moves</button>
            </div>
        );
    }

    toggleMovesList() {
        this.setState({
            reverseMoves: !this.state.reverseMoves
        });
    }
}

function getCoordinatesOfChange(newSquares, oldSquares) {

    if(newSquares && oldSquares && newSquares.length === oldSquares.length){
        for (let i in newSquares) {
            if(newSquares[i] && newSquares[i] !== oldSquares[i]){
                let row = Math.floor(i / 3) + 1;
                let col = (i % 3) + 1;
                return { row, col };
            }
        }
    }

}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                player: squares[a],
                positions: [a, b, c]
            };
        }
    }
    return null;
}

export default Game;