import Board, { PLAYER_STYLES } from "./App";

const winInRows = (boardState, player, potential = false) => {
    // Checks for wins in rows. Returns number of wins found for player.
    // player = 0 for human and 1 for AI
    // If potential === true, returns number of possible wins given the current board state

    const color = player === 0 ? PLAYER_STYLES.HUMAN_STYLE : PLAYER_STYLES.AI_STYLE;

    let consecutivePieces = 0;
    let wins = 0;
    for (let row = 0; row < boardState[0].length; row++) {
        for (let col = 0; col <= boardState.length - 4; col++) {
            consecutivePieces = 0;
            for (let i = 0; i < 4; i++) {
                if (boardState[col + i][row] === color || (boardState[col + i][row] === null && potential)) {
                    consecutivePieces++;
                }
            }
            if (consecutivePieces === 4) {
                wins++;
            }
        }
    }
    return wins;
}

const winInCols = (boardState, player, potential = false) => {
    // Checks for wins in columns. Returns number of wins found for player.
    // player = 0 for human and 1 for AI
    // If potential === true, returns number of possible wins given the current board state

    const color = player === 0 ? PLAYER_STYLES.HUMAN_STYLE : PLAYER_STYLES.AI_STYLE;

    let consecutivePieces = 0;
    let wins = 0;
    for (let col = 0; col < boardState.length; col++) {
        for (let row = 0; row <= boardState[0].length - 4; row++) {
            consecutivePieces = 0;
            for (let i = 0; i < 4; i++) {
                if (boardState[col][row + i] === color || (boardState[col][row + i] === null && potential)) {
                    consecutivePieces++;
                }
            }
            if (consecutivePieces === 4) {
                wins++;
            }
        }
    }
    return wins;
}

const winInRightDiags = (boardState, player, potential = false) => {
    // Checks for wins in diagonals going up and to the right
    // If potential === true, returns number of possible wins given the current board state

    const color = player === 0 ? PLAYER_STYLES.HUMAN_STYLE : PLAYER_STYLES.AI_STYLE;

    let consecutivePieces = 0;
    let wins = 0;
    for (let col = 0; col <= boardState.length - 4; col++) {
        for (let row = 0; row <= boardState[0].length - 4; row++) {
            consecutivePieces = 0;
            for (let i = 0; i < 4; i++) {
                if (boardState[col + i][row + i] === color || (boardState[col + i][row + i] === null && potential)) {
                    consecutivePieces++;
                }
            }
            if (consecutivePieces === 4) {
                wins++;
            }
        }
    }
    return wins;
}

const winInLeftDiags = (boardState, player, potential = false) => {
    // Checks for wins in diagonals going up and to the left
    // If potential === true, returns number of possible wins given the current board state

    const color = player === 0 ? PLAYER_STYLES.HUMAN_STYLE : PLAYER_STYLES.AI_STYLE;

    let consecutivePieces = 0;
    let wins = 0;
    for (let col = boardState.length - 4; col < boardState.length; col++) {
        for (let row = 0; row <= boardState[0].length - 4; row++) {
            consecutivePieces = 0;
            for (let i = 0; i < 4; i++) {
                if (boardState[col - i][row + i] === color || (boardState[col - i][row + i] === null && potential)) {
                    consecutivePieces++;
                }
            }
            if (consecutivePieces === 4) {
                wins++;
            }
        }
    }
    return wins;
}

export const WinsOnBoard = (boardState, player, potential = false) => {
    // Counts the number of wins found on the entire board
    // If potential === true, returns number of possible wins on the entire board
    let wins = 0;
    wins += winInRows(boardState, player, potential);
    wins += winInCols(boardState, player, potential);
    wins += winInLeftDiags(boardState, player, potential);
    wins += winInRightDiags(boardState, player, potential);
    return wins;
}