class Board {
  constructor(boardSize) {
    this.boardSize = boardSize ** 2; // 4x4 => 16
    this.indexPrevious = 0;
    this.indexCurrent = 0;
  }

  drawBoard() {
    const board = document.getElementsByClassName('board')[0];
    for (let i = 0; i < this.boardSize; i += 1) {
      const boardCell = document.createElement('div');
      boardCell.className = 'cell';
      boardCell.id = `cell${i}`;
      board.appendChild(boardCell);
    //   <div class="board">
    //       <div class="cell" id=`cell${i}`></div>
    //   </div>
    }
    this.drawCharacter();
  }

  drawCharacter() {
    // рандомное перемещение, без перемещения в то же самое поле
    setInterval(() => {
      do { // true
        this.indexCurrent = Math.floor(Math.random() * this.boardSize);
      } while (this.indexCurrent === this.indexPrevious); // false

      if (this.indexPrevious >= 0) {
        const boardCellPrevious = document.getElementById(`cell${this.indexPrevious}`);
        boardCellPrevious.innerHTML = '';
      }
      const boardCellCurrent = document.getElementById(`cell${this.indexCurrent}`);
      boardCellCurrent.innerHTML = '<img src = "./goblin.png">';
      this.indexPrevious = this.indexCurrent;
    }, 1000);
  }
}

const newBoard = new Board(4);
newBoard.drawBoard();