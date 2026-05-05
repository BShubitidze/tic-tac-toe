import { Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { PvpComponent } from './game-start/pvp/pvp.component';
import { PvcComponent } from './game-start/pvc/pvc.component';

export const routes: Routes = [
  { path: '', component: StartScreenComponent },
  { path: 'play-friend', component: PvpComponent },
  { path: 'play-cpu', component: PvcComponent },
];
