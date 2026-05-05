import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  imports: [RouterLink],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss',
})
export class StartScreenComponent {
  selectedMark: 'x' | 'o' = 'x';
}
