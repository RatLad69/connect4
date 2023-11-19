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

export const DoAI = (boardState) => {
    // Returns the column index of the AI's selected move
    let selectedMove = leftAI(boardState);
    return selectedMove;
};