import { useState, useEffect } from 'react'
import { DoAI } from "./AI";
import { WinsOnBoard, CheckWinner } from "./WinConditions"

export const GAME_STATE = {
    PLAYER_TURN: "player_turn",
    AI_TURN: "ai_turn",
    PLAYER_WIN: "player_win",
    AI_WIN: "ai_win",
    DRAW: "game_draw",
    ERROR: "game_error"
};

export const PLAYER_STYLES = {
    HUMAN_STYLE: { backgroundColor: "#ff0000" },
    AI_STYLE: { backgroundColor: "#000000" }
};

function Square({ playerStyle }) {
    return <button className="square" style={playerStyle} ></button>
}

function DropButton({ dropClick }) {
    const buttonStyle = { backgroundColor: "#BBBBBB" };
    return <button className="square" onClick={dropClick} style={buttonStyle} ></button>
}

function Board() {
    const [spaces, setSpaces] = useState([Array(6).fill(null), Array(6).fill(null),
        Array(6).fill(null), Array(6).fill(null), Array(6).fill(null), Array(6).fill(null),
        Array(6).fill(null)]); //Array of 7 column arrays

    //const players = ["#ff0000", "#000000"];
    const player1Style = PLAYER_STYLES.HUMAN_STYLE;
    const player2Style = PLAYER_STYLES.AI_STYLE;
    const playerStyles = [player1Style, player2Style];
    //const [currentPlayer, setPlayer] = useState(0);
    const [gameState, setGameState] = useState(GAME_STATE.PLAYER_TURN);

    useEffect(() => {
        //console.log("Wins found on board: " + WinsOnBoard(spaces, 0));

        // AI TURN
        if (gameState === GAME_STATE.AI_TURN) {
            dropPiece(DoAI(spaces), 1);
            //setGameState(GAME_STATE.PLAYER_TURN); // TODO: add logic for game state
            setGameState(CheckWinner(spaces, gameState));
        }
        
    }, [gameState, spaces]);

    function dropPiece(columnIdx, player) {
        const newSpaces = spaces.slice();

        for (let i = 0; i < newSpaces[columnIdx].length; i++) {
            if (newSpaces[columnIdx][i] === null) {
                newSpaces[columnIdx][i] = playerStyles[player];
                break;
            }
        }
        setSpaces(newSpaces);
    }

    function playerClick(columnIdx) {
        console.log(gameState);
        // No move if not player's turn
        if (gameState !== GAME_STATE.PLAYER_TURN) {
            return;
        }
        
        if (!spaces[columnIdx].includes(null)) {
            console.log("illegal");
            return; // Not legal if column is full
        } else {
            dropPiece(columnIdx, 0); // Make the move if legal
            setGameState(CheckWinner(spaces, gameState)); // Check for win and update game state
        }
        //console.log(spaces[columnIdx]);
        //setPlayer((currentPlayer + 1) % 2);
    }

    return (
        <>
            <div className="board-row">
                <Square playerStyle={spaces[0][5]} />
                <Square playerStyle={spaces[1][5]} />
                <Square playerStyle={spaces[2][5]} />
                <Square playerStyle={spaces[3][5]} />
                <Square playerStyle={spaces[4][5]} />
                <Square playerStyle={spaces[5][5]} />
                <Square playerStyle={spaces[6][5]} />
            </div>
            <div className="board-row">
                <Square playerStyle={spaces[0][4]} />
                <Square playerStyle={spaces[1][4]} />
                <Square playerStyle={spaces[2][4]} />
                <Square playerStyle={spaces[3][4]} />
                <Square playerStyle={spaces[4][4]} />
                <Square playerStyle={spaces[5][4]} />
                <Square playerStyle={spaces[6][4]} />
            </div>
            <div className="board-row">
                <Square playerStyle={spaces[0][3]} />
                <Square playerStyle={spaces[1][3]} />
                <Square playerStyle={spaces[2][3]} />
                <Square playerStyle={spaces[3][3]} />
                <Square playerStyle={spaces[4][3]} />
                <Square playerStyle={spaces[5][3]} />
                <Square playerStyle={spaces[6][3]} />
            </div>
            <div className="board-row">
                <Square playerStyle={spaces[0][2]} />
                <Square playerStyle={spaces[1][2]} />
                <Square playerStyle={spaces[2][2]} />
                <Square playerStyle={spaces[3][2]} />
                <Square playerStyle={spaces[4][2]} />
                <Square playerStyle={spaces[5][2]} />
                <Square playerStyle={spaces[6][2]} />
            </div>
            <div className="board-row">
                <Square playerStyle={spaces[0][1]} />
                <Square playerStyle={spaces[1][1]} />
                <Square playerStyle={spaces[2][1]} />
                <Square playerStyle={spaces[3][1]} />
                <Square playerStyle={spaces[4][1]} />
                <Square playerStyle={spaces[5][1]} />
                <Square playerStyle={spaces[6][1]} />
            </div>
            <div className="board-row">
                <Square playerStyle={spaces[0][0]} />
                <Square playerStyle={spaces[1][0]} />
                <Square playerStyle={spaces[2][0]} />
                <Square playerStyle={spaces[3][0]} />
                <Square playerStyle={spaces[4][0]} />
                <Square playerStyle={spaces[5][0]} />
                <Square playerStyle={spaces[6][0]} />
            </div>
            <div className="board-row">
                <DropButton dropClick={() => playerClick(0)} />
                <DropButton dropClick={() => playerClick(1)} />
                <DropButton dropClick={() => playerClick(2)} />
                <DropButton dropClick={() => playerClick(3)} />
                <DropButton dropClick={() => playerClick(4)} />
                <DropButton dropClick={() => playerClick(5)} />
                <DropButton dropClick={() => playerClick(6)} />
            </div>
        </>
    );
}

export default Board;