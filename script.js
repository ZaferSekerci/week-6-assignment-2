window.addEventListener("DOMContentLoaded", () => {
  const boards = Array.from(document.querySelectorAll(".board"));
  const playerDisplay = document.querySelector(".display-player");
  const resetButton = document.querySelector("#reset");
  const announcer = document.querySelector(".announcer");

  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let isGameActive = true;

  const PLAYERX_WON = "PLAYERX_WON";
  const PLAYERO_WON = "PLAYERO_WON";
  const TIE = "TIE";

  const winningConditions = [
    //kazanma ihtimalleri dizisi
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON); //kazanan oyuncuyu duyur
      isGameActive = false;
      return;
    }

    if (!board.includes("")) announce(TIE); // eğer alanda boş kutu kalmadıysa berabere
  }

  const announce = (type) => {
    switch (type) {
      case PLAYERO_WON:
        announcer.innerHTML = '<span class="playerO">O</span> Kazandı';
        break;
      case PLAYERX_WON:
        announcer.innerHTML = '<span class="playerX">X</span> Kazandı';
        break;
      case TIE:
        announcer.innerText = "Berabere";
    }
    announcer.classList.remove("hide");
  };

  const isValidAction = (board) => {
    if (board.innerText === "X" || board.innerText === "O") {
      return false;
    }

    return true;
  };

  const updateBoard = (index) => {
    board[index] = currentPlayer;
  };

  const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
  };

  const userAction = (board, index) => {
    if (isValidAction(board) && isGameActive) {
      board.innerText = currentPlayer;
      board.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResultValidation();
      changePlayer();
    }
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    announcer.classList.add("hide");

    if (currentPlayer === "O") {
      changePlayer();
    }

    boards.forEach((board) => {
      board.innerText = "";
      board.classList.remove("playerX");
      board.classList.remove("playerO");
    });
  };

  boards.forEach((board, index) => {
    board.addEventListener("click", () => userAction(board, index));
  });

  resetButton.addEventListener("click", resetBoard);
});
