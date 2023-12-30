import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'characters', 
    loadChildren: () => import('./modules/character/character-routing.module').then((m) => m.CharacterRoutingModule) 
  },
  { 
    path: 'episodes', 
    loadChildren: () => import('./modules/episode/episode-routing.module').then((m) => m.EpisodeRoutingModule) 
  },
  { path: 
    'locations', 
    loadChildren: () => import('./modules/location/location-routing.module').then((m) => m.LocationRoutingModule) 
  },
  { 
    path: 'login', 
    loadChildren: () => import('./modules/login/login-routing.module').then((m) => m.LoginRoutingModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}