const getLegalMoves = (boardState) => {
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

export const DoAI = (boardState) => {
    // Returns the column index of the AI's selected move
    const legalMoves = getLegalMoves(boardState);
    let selectedMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
    return selectedMove;
};