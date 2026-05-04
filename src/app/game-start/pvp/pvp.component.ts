import { Component } from '@angular/core';
import { GameStartComponent } from '../game-start.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pvp',
  imports: [CommonModule],
  templateUrl: '../game-start.component.html',
  styleUrls: ['../game-start.component.scss'],
})
export class PvpComponent extends GameStartComponent {
  override makeMove(index: number) {
    if (this.board[index] === '') {
      this.board[index] = this.currentPlayer;

      const winner = this.checkWinner(this.board);
      if (winner) {
        console.log('მოიგო: ' + winner);
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }
}
