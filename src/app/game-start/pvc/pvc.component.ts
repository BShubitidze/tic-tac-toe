import { Component, OnInit } from '@angular/core';
import { GameStartComponent } from '../game-start.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pvc',
  imports: [CommonModule],
  templateUrl: '../game-start.component.html',
  styleUrls: ['../game-start.component.scss'],
})
export class PvcComponent extends GameStartComponent implements OnInit {
  humanMark: 'X' | 'O' = 'X';
  aiMark: 'X' | 'O' = 'O';

  constructor(private route: ActivatedRoute) {
    super();
    this.isPvC = true;
  }

  ngOnInit(): void {
    const choice = this.route.snapshot.queryParamMap
      .get('userChoice')
      ?.toLowerCase();

    if (choice === 'o') {
      this.humanMark = 'O';
      this.aiMark = 'X';
    } else {
      this.humanMark = 'X';
      this.aiMark = 'O';
    }

    this.player1Name = this.humanMark === 'X' ? 'X (YOU)' : 'X (CPU)';
    this.player2Name = this.humanMark === 'O' ? 'O (YOU)' : 'O (CPU)';

    if (this.currentPlayer === this.aiMark) {
      setTimeout(() => this.bestMove(), 500);
    }
  }

  override makeMove(index: number) {
    if (
      !this.isGameOver &&
      this.board[index] === '' &&
      this.currentPlayer === this.humanMark
    ) {
      this.board[index] = this.humanMark;

      const result = this.checkWinner(this.board);
      if (result) {
        this.updateScore(result);
      } else {
        this.currentPlayer = this.aiMark;
        setTimeout(() => this.bestMove(), 500);
      }
    }
  }

  override nextRound() {
    this.board = Array(9).fill('');
    this.isGameOver = false;

    this.startingPlayer = this.startingPlayer === 'X' ? 'O' : 'X';
    this.currentPlayer = this.startingPlayer;
    super.nextRound();

    if (this.currentPlayer === this.aiMark) {
      setTimeout(() => this.bestMove(), 500);
    }
    this.showResultModal = false;
    this.roundWinner = null;
  }

  bestMove() {
    if (this.isGameOver) return;

    let bestScore = -Infinity;
    let move: number | undefined;

    for (let i = 0; i < 9; i++) {
      if (this.board[i] === '') {
        this.board[i] = this.aiMark;
        const score = this.minimax(this.board, 0, false);
        this.board[i] = '';
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    if (move !== undefined) {
      this.board[move] = this.aiMark;

      const result = this.checkWinner(this.board);
      if (result) {
        this.updateScore(result);
      } else {
        this.currentPlayer = this.humanMark;
      }
    }
  }

  minimax(board: string[], depth: number, isMaximizing: boolean): number {
    const result = this.checkWinner(board);
    if (result === this.aiMark) return 1;
    if (result === this.humanMark) return -1;
    if (result === 'Tie') return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
          board[i] = this.aiMark;
          const score = this.minimax(board, depth + 1, false);
          board[i] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
          board[i] = this.humanMark;
          const score = this.minimax(board, depth + 1, true);
          board[i] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }
}
