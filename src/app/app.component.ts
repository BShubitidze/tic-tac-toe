import { Component } from '@angular/core';
import { GameStartComponent } from './game-start/game-start.component';
@Component({
  selector: 'app-root',
  imports: [GameStartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tic-tac-toe';
}
