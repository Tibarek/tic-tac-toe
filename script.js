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

// const ScreenDisplay = () => {
//   const boardDiv = document.querySelector(".board");
//   const playerTurnDiv = document.querySelector(".playerTurn");
//   const startBtn = document.querySelector(".start-btn");
//   const restartBtn = document.querySelector(".restart-btn");
//   const playerForm = document.querySelector(".player-form");
//   const game = Game();

//   const updateScreen = () => {
//     boardDiv.textContent = "";
//     const board = game.getBoard();
//     const currentPlayer = game.getCurrentPlayer();
//     playerTurnDiv.textContent = `${currentPlayer.name}'s turn`;
//     let i = 0;
//     board.forEach(row => {
//       row.forEach((cell, index) => {
//         const cellButton = document.createElement("button");
//         cellButton.classList.add("cell");
//         cellButton.dataset.row = i;
//         cellButton.dataset.column = index;
//         cellButton.textContent = cell;
//         boardDiv.appendChild(cellButton);
//       })
//       i++;
//     });
//   }
//   function clickHandlerBoard(e) {
//     const selectedCol = e.target.dataset.column;
//     const selectedRow = e.target.dataset.row;
//     game.playTurn(selectedRow,selectedCol);
//     updateScreen();
//     }
//   boardDiv.addEventListener("click", clickHandlerBoard);

//   restartBtn.addEventListener("click", () => {
//     game.restartGame();
//     updateScreen();
//   });

//   startBtn.addEventListener("click", () => {
//     playerForm.textContent = "";
//     WelcomePage();
//   });
// };


 const WelcomePage = () => {
   const boardDiv = document.querySelector(".board");
  const playerTurnDiv = document.querySelector(".playerTurn");
  const startBtn = document.querySelector(".start-btn");
  const restartBtn = document.querySelector(".restart-btn");
  // const playerForm = document.querySelector(".player-form");
  // const game = Game();
  const game = Game();
  const player1Para = document.querySelector(".player1-p");
  const player2Para = document.querySelector(".player2-p");
  const playerForm = document.querySelector(".player-form");
  const p1 = document.createElement("input");
  const p2 = document.createElement("input");
  const playBtn = document.createElement("button");
  playBtn.classList.add("submit-btn");
  playBtn.textContent = "Play";
  p1.classList.add("p1");
  p2.classList.add("p2")
  playerForm.appendChild(p1);
  playerForm.appendChild(p2);
  playerForm.appendChild(playBtn);


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
    playerForm.textContent = "";
    updateScreen();

  }
  playBtn.addEventListener("click", updatePlayer);


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
  boardDiv.addEventListener("click", clickHandlerBoard);

  restartBtn.addEventListener("click", () => {
    game.restartGame();
    updateScreen();
  });

  startBtn.addEventListener("click", () => {
    playerForm.textContent = "";
    WelcomePage();
  });
}



WelcomePage();
