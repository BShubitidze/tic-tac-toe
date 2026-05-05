import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type Winner = 'X' | 'O' | 'Tie';

@Component({
  selector: 'app-game-start',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-start.component.html',
  styleUrl: './game-start.component.scss',
})
export class GameStartComponent {
  currentPlayer: 'X' | 'O' = 'X';
  startingPlayer: 'X' | 'O' = 'X';

  isGameOver = false;
  isPvC = false;

  player1Name = 'X (YOU)';
  player2Name = 'O (CPU)';

  xScore = 0;
  oScore = 0;
  ties = 0;

  board: string[] = Array(9).fill('');

  showResultModal = false;
  showRestartModal = false;
  roundWinner: Winner | null = null;

  makeMove(index: number) {
    if (
      !this.isGameOver &&
      this.board[index] === '' &&
      !this.showResultModal &&
      !this.showRestartModal
    ) {
      this.board[index] = this.currentPlayer;

      const winner = this.checkWinner(this.board);
      if (winner) {
        this.updateScore(winner as Winner);
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  checkWinner(board: string[]): Winner | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a] as 'X' | 'O';
      }
    }

    return board.includes('') ? null : 'Tie';
  }

  updateScore(winner: Winner) {
    this.isGameOver = true;
    this.roundWinner = winner;

    if (winner === 'X') this.xScore++;
    else if (winner === 'O') this.oScore++;
    else this.ties++;

    this.showResultModal = true;
  }

  nextRound() {
    this.board = Array(9).fill('');
    this.isGameOver = false;
    this.showResultModal = false;
    this.roundWinner = null;

    this.startingPlayer = this.startingPlayer === 'X' ? 'O' : 'X';
    this.currentPlayer = this.startingPlayer;

    if (this.isPvC && this.currentPlayer === 'O') {
      setTimeout(() => (this as any).bestMove(), 500);
    }
  }

  openRestartModal() {
    this.showRestartModal = true;
  }

  closeRestartModal() {
    this.showRestartModal = false;
  }

  confirmRestart() {
    this.showRestartModal = false;
    this.resetGame();
  }

  resetGame() {
    this.xScore = 0;
    this.oScore = 0;
    this.ties = 0;
    this.startingPlayer = 'O';

    this.showResultModal = false;
    this.roundWinner = null;
    this.nextRound();
  }

  quitGame() {
    window.location.href = '/';
  }

  get winnerLabel(): string {
    if (this.roundWinner === 'Tie') return 'ROUND TIED';
    return `${this.roundWinner} TAKES THE ROUND`;
  }

  get winnerClass(): string {
    if (this.roundWinner === 'X') return 'winner-x';
    if (this.roundWinner === 'O') return 'winner-o';
    return 'winner-tie';
  }
}
