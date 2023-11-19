import { WinsOnBoard } from "./WinConditions"

export const getLegalMoves = (boardState) => {
    // Returns an array of the column indices of all legal moves
    let legalMoves = [];
    for (let columnIdx = 0; columnIdx < boardState.length; columnIdx++) {
        if (boardState[columnIdx].includes(null)) {
            legalMoves.push(columnIdx);
        }
    }
    //console.log("legal moves: " + legalMoves);
    return legalMoves;
};

const randomAI = (boardState) => {
    // Returns a random column index of a legal move
    const legalMoves = getLegalMoves(boardState);
    let selectedMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
    return selectedMove;
}

const leftAI = (boardState) => {
    // Returns the left-most legal move
    const legalMoves = getLegalMoves(boardState);
    return legalMoves[0];
}

const evaluateBoard = (boardState) => {
    // Returns a number. Negative indicates AI advantage. Positive indicates player advantage
    let evaluation = 0;
    if (WinsOnBoard(boardState, 0) > 0) {
        evaluation = Infinity;
    } else if (WinsOnBoard(boardState, 1) > 0) {
        evaluation = -Infinity;
    } else {
        let playerPotentialWins = WinsOnBoard(boardState, 0, true);
        let AIPotentialWins = WinsOnBoard(boardState, 1, true);
        evaluation = playerPotentialWins - AIPotentialWins;
    }
    return evaluation;
}



export const DoAI = (boardState) => {
    // Returns the column index of the AI's selected move
    let selectedMove = leftAI(boardState);
    return selectedMove;
};