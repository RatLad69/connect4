import Board from "./App";
import { WinsOnBoard } from "./WinConditions"
import { PLAYER_STYLES } from "./App"

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

const thinkMove = (boardState, columnIdx, player) => {
    // Returns a board array representing the board state after a move was made on boardState in columnIdx column

    const player1Style = PLAYER_STYLES.HUMAN_STYLE;
    const player2Style = PLAYER_STYLES.AI_STYLE;
    const playerStyles = [player1Style, player2Style];

    let newBoardState = structuredClone(boardState);
    for (let i = 0; i < newBoardState[columnIdx].length; i++) {
        if (newBoardState[columnIdx][i] === null) {
            newBoardState[columnIdx][i] = playerStyles[player];
            break;
        }
    }
    return newBoardState;
}

const minimax = (boardState, depth, a, b, maxiPlayer = false) => {
    let tmpBoardState = structuredClone(boardState);

    if (depth === 0 || WinsOnBoard(tmpBoardState, 0) > 0 || WinsOnBoard(tmpBoardState, 1) > 0) {
        return evaluateBoard(tmpBoardState);
    }
    if (maxiPlayer) {
        let maxEvaluation = -Infinity;
        let moves = getLegalMoves(tmpBoardState);
        for (let i = 0; i < moves.length; i++) {
            let childState = thinkMove(tmpBoardState, moves[i], 0); // 0 since human is maximizing player
            let evaluation = minimax(childState, depth - 1, a, b, false);
            maxEvaluation = Math.max(maxEvaluation, evaluation);
            a = Math.max(a, evaluation);
            if (b <= a) {
                break;
            }
        }
        return maxEvaluation;
    } else {
        let minEvaluation = Infinity;
        let moves = getLegalMoves(tmpBoardState);
        for (let i = 0; i < moves.length; i++) {
            let childState = thinkMove(tmpBoardState, moves[i], 1); // 1 since AI is minimizing player
            let evaluation = minimax(childState, depth - 1, a, b, true);
            minEvaluation = Math.min(minEvaluation, evaluation);
            b = Math.min(b, evaluation);
            if (b <= a) {
                break;
            }
        }
        return minEvaluation;
    }
}

const chooseMiniMove = (boardState) => {
    let tmpBoardState = structuredClone(boardState);
    let candidates = getLegalMoves(tmpBoardState);
    let bestCandidateIdx = 0;
    let bestEval = Infinity;
    for (let i = 0; i < candidates.length; i++) {
        let candidateEval = minimax(thinkMove(tmpBoardState, candidates[i], 1), 6, -Infinity, Infinity, true) + (Math.random() * 0.5);
        if (candidateEval < bestEval) {
            bestCandidateIdx = i;
            bestEval = candidateEval;
        }
        console.log("Col: " + candidates[i] + " -- " + candidateEval);
    }
    console.log("Choosing: " + candidates[bestCandidateIdx]);
    return candidates[bestCandidateIdx];
}

export const DoAI = (boardState) => {
    // Returns the column index of the AI's selected move

    //let selectedMove = leftAI(boardState);
    //console.log("EVAL: " + minimax(boardState, 7, -Infinity, Infinity, false));
    let selectedMove = chooseMiniMove(boardState);
    return selectedMove;
};