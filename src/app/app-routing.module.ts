import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'characters', loadChildren: () => import('./modules/character/character-routing.module').then((m) => m.CharacterRoutingModule) },
  { path: 'episodes', loadChildren: () => import('./modules/episode/episode-routing.module').then((m) => m.EpisodeRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}