import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-game-start',
  imports: [CommonModule],
  templateUrl: './game-start.component.html',
  styleUrl: './game-start.component.scss',
})
export class GameStartComponent {
  // იქსიკი იწყებს სულ
  currentPlayer: 'X' | 'O' = 'X';

  // ცარიელი ბოქსები
  board: string[] = Array(9).fill('');

  xScore = 0;
  oScore = 0;
  ties = 0;

  // სვლის გაკეთების ფუნქცია
  makeMove(index: number) {
    if (this.board[index] === '') {
      this.board[index] = this.currentPlayer;
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  // თამაშის ძირითადი ლოგიკა
  checkWinner(board: string[]): string | null {
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
      if (board[a] && board[b] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return board.includes('') ? null : 'Tie';
  }
}
