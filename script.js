const N = 8;

function printSolution(board) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] == 1) document.getElementById(`${i}${j}`).innerHTML = "Q";
      else document.getElementById(`${i}${j}`).innerHTML = "";
    }
  }
}

function isSafe(board, row, col) {
  // Check this row on left side
  for (let i = 0; i < col; i++) {
    if (board[row][i] == 1) return false;
  }

  // Check upper diagonal on left side
  for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
    if (board[i][j]) return false;

  // Check lower diagonal on left side
  for (i = row, j = col; j >= 0 && i < N; i++, j--)
    if (board[i][j]) return false;

  return true;
}


function solveNQUtil(board, col) {
  if (col >= N) return true;

  let order = [...Array(N).keys()];
  order = order.sort(() => Math.random() - 0.5);

  for (let i = 0; i < N; i++) {
    let row = order[i];
    if (isSafe(board, row, col)) {
      board[row][col] = 1;
      if (solveNQUtil(board, col + 1)) {
        return true;
      }

      board[row][col] = 0;
    }
  }
  return false;
}

function solveNQ() {
  let board = [];
  for (let i = 0; i < N; i++) {
    board[i] = [];
    for (let j = 0; j < N; j++) {
      board[i][j] = 0;
    }
  }

  if (solveNQUtil(board, 0) == false) {
    alert("Solution does not exist");
    return false;
  }

  printSolution(board);
  return true;
}

// Driver Code
const start = () => {
  solveNQ();
};
