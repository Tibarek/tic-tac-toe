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

  const clearBoard = () => {
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        if(board[i][j] !== ""){
          board[i][j] = "";
        }
      }
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

  return {getBoard, printBoard, placeMark, checkWin, checkTie, clearBoard};
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

  const restartGame = () => {
    gameboard.clearBoard();
    console.log(gameboard.getBoard());
  }

  return { player1, player2, getCurrentPlayer, playTurn, restartGame, getBoard: gameboard.getBoard};
};

 const WelcomePage = () => {
  const boardDiv = document.querySelector(".board");
  const playerTurnDiv = document.querySelector(".playerTurn");
  const gameBtnDiv = document.querySelector(".game-btns");
  const game = Game();
  const playerDiv = document.querySelector(".player-name");
  const player1Para = document.querySelector(".player1-p");
  const player2Para = document.querySelector(".player2-p");
  const playerForm = document.createElement("form");
  playerForm.classList.add("player-form");
  const p1Div = document.createElement("div");
  const p2Div = document.createElement("div");
  const p1Label = document.createElement("label")
  p1Label.textContent = "Enter Player One's Name";
  const p1 = document.createElement("input");
  const p2Label = document.createElement("label")
  p2Label.textContent = "Enter Player Two's Name";
  const p2 = document.createElement("input");
  const playBtn = document.createElement("button");
  playBtn.classList.add("submit-btn");
  playBtn.textContent = "Play";
  p1.classList.add("p1");
  p2.classList.add("p2")
  p1Div.appendChild(p1Label);
  p1Div.appendChild(p1);
  p2Div.appendChild(p2Label);
  p2Div.appendChild(p2);
  playerForm.appendChild(p1Div);
  playerForm.appendChild(p2Div);
  playerForm.appendChild(playBtn);
  playerDiv.appendChild(playerForm);


  function updatePlayer(e) {
    e.preventDefault();
    if(p1.value === ""){
      game.player1.name = "Player1";
    }else if(p1.value !== ""){
      game.player1.name = p1.value;
    }
    player1Para.textContent = `${game.player1.name}-O`;

    if(p2.value === ""){
      game.player2.name = "Player2";
    }else if(p2.value !== ""){
      console.log(p2.value);
      game.player2.name = p2.value;
      console.log(game.player2.name);
    }
    player2Para.textContent = `${game.player2.name}-X`;
    playerDiv.textContent = "";
    const startBtn = document.createElement("button");
    const restartBtn = document.createElement("button");
    startBtn.textContent = "New Game";
    restartBtn.textContent = "Play Again"
    gameBtnDiv.appendChild(startBtn);
    gameBtnDiv.appendChild(restartBtn);

  restartBtn.addEventListener("click", () => {
    game.restartGame();
    updateScreen();
  });

  startBtn.addEventListener("click", () => {
    gameBtnDiv.textContent = "";
    playerDiv.textContent = "";
    boardDiv.textContent = "";
    player1Para.textContent = "";
    player2Para.textContent = "";
    playerTurnDiv.textContent = "";
    WelcomePage();
  });
    updateScreen();

  }
  playBtn.addEventListener("click", updatePlayer);


  const updateScreen = () => {
    boardDiv.textContent = "";
    const board = game.getBoard();
    const currentPlayer = game.getCurrentPlayer();
    playerTurnDiv.textContent = `${currentPlayer.name}'s turn`;
    let i = 0;
    const boardBox = document.createElement("div");
    boardBox.classList.add("board-box");
    board.forEach(row => {
      row.forEach((cell, index) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.row = i;
        cellButton.dataset.column = index;
        cellButton.textContent = cell;
        boardBox.appendChild(cellButton);
        boardDiv.appendChild(boardBox);
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
  boardDiv.addEventListener("click", clickHandlerBoard);
}



WelcomePage();
