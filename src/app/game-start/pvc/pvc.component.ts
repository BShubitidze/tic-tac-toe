import { Component } from '@angular/core';
import { GameStartComponent } from '../game-start.component';

@Component({
  selector: 'app-pvc',
  imports: [],
  templateUrl: '../game-start.component.html',
  styleUrls: ['../game-start.component.scss'],
})
export class PvcComponent extends GameStartComponent {
  override makeMove(index: number) {
    if (this.board[index] === '' && this.currentPlayer === 'X') {
      this.board[index] = 'X';

      if (!this.checkWinner(this.board)) {
        this.currentPlayer = 'O';
        setTimeout(() => this.bestMove(), 500);
      }
    }
  }

  bestMove() {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < 9; i++) {
      if (this.board[i] === '') {
        this.board[i] = 'O';
        let score = this.minimax(this.board, 0, false);
        this.board[i] = '';
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    if (move !== undefined) {
      this.board[move] = 'O';
      this.currentPlayer = 'X';
      this.checkWinner(this.board);
    }
  }

  minimax(board: string[], depth: number, isMaximizing: boolean): number {
    let result = this.checkWinner(board);
    if (result === 'O') return 10;
    if (result === 'X') return -10;
    if (result === 'Tie') return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
          board[i] = 'O';
          let score = this.minimax(board, depth + 1, false);
          board[i] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
          board[i] = 'X';
          let score = this.minimax(board, depth + 1, true);
          board[i] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }
}
