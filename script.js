const Gameboard = () => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

  const printBoard = () => {
    board.forEach(row => {
      console.log(row.join("|"));
    });
    console.log("\n");
  };

  const placeMark = (row, col, mark) => {
    if(board[row][col] === ""){
      board[row][col] = mark;
    }
  };

  const getBoard = () => board;

  const checkWin = (mark) => {
    for(let i = 0; i < 3; i++){
      if(
        (board[i][0] === mark && board[i][1] === mark && board[i][2] === mark) ||
        (board[0][i] === mark && board[1][i] === mark && board[2][i] === mark)
      ) {
        return true;
      }
    }

    if (
      (board[0][0] === mark && board[1][1] === mark && board[2][2] === mark) ||
      (board[0][2] == mark && board[1][1] && board[2][0] === mark)
    ){
      return true;
    }
    
    return false;
  };

  const checkTie = () => {
    let count = 0;
    for(row of board){
      for(let i = 0; i < 3; i++){
        if(row[i] !== ""){
          count++;
        }
      }
    }
    if(count === 9){
      return true;
    }
    return false;
  };

  return {getBoard, printBoard, placeMark, checkWin, checkTie};
};

const Player = (name, mark) => {
  return {name, mark};
};


const Game = () => {
  const gameboard = Gameboard();
  const board = gameboard.getBoard();

  const player1 = Player("Player1", "O");
  const player2 = Player("Player2", "X");
  let currentPlayer = player1;
  
  const switchPlayer = () => {
    currentPlayer = (currentPlayer.mark === "O") ? player2 : player1;
  };

  const getCurrentPlayer = () => currentPlayer;


  const playTurn = (row, col) => {
    if(board[row][col] !== ""){
      console.log("Spot already taken! Try again");
      return;
    }

    gameboard.placeMark(row, col, currentPlayer.mark);
    gameboard.printBoard();

    if (gameboard.checkWin(currentPlayer.mark)) {
      console.log(`${currentPlayer.name} wins!`);
      return;
    }

    if (gameboard.checkTie()) {
      console.log("It's a tie");
      return;
    }

    switchPlayer();
  };

  return { player1, player2, getCurrentPlayer, playTurn, getBoard: gameboard.getBoard};
};

const ScreenDisplay = () => {
  const boardDiv = document.querySelector(".board");
  const playerTurnDiv = document.querySelector(".playerTurn");
  const player1Input = document.querySelector("#player1");
  const player2Input = document.querySelector("#player2");
  const submitBtn = document.querySelector(".submit-btn");
  const player1Para = document.querySelector(".player1-p");
  const player2Para = document.querySelector(".player2-p");
  const game = Game();

  function updatePlayer(e) {
    e.preventDefault();
    if(player1Input.value === ""){
      game.player1.name = "Player1";
    }else if(player1Input.value !== ""){
      game.player1.name = player1Input.value;
    }
    player1Para.textContent = `${game.player1.name}-O`;

    if(player2Input.value === ""){
      game.player2.name = "Player2";
    }else if(player2Input.value !== ""){
      game.player2.name = player2Input.value;
    }
    player2Para.textContent = `${game.player2.name}-X`;
    updateScreen();
  }
  
  const updateScreen = () => {
    boardDiv.textContent = "";
    const board = game.getBoard();
    const currentPlayer = game.getCurrentPlayer();
    playerTurnDiv.textContent = `${currentPlayer.name}'s turn`;
    let i = 0;
    board.forEach(row => {
      row.forEach((cell, index) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.row = i;
        cellButton.dataset.column = index;
        cellButton.textContent = cell;
        boardDiv.appendChild(cellButton);
      })
      i++;
    });
  }
  function clickHandlerBoard(e) {
    const selectedCol = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;
    game.playTurn(selectedRow,selectedCol);
    updateScreen();
    }

  submitBtn.addEventListener("click", updatePlayer);
  boardDiv.addEventListener("click", clickHandlerBoard);
};

ScreenDisplay();