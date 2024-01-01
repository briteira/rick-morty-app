import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  { 
    path: 'characters', 
    loadChildren: () => import('./modules/character/character-routing.module').then((m) => m.CharacterRoutingModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'episodes', 
    loadChildren: () => import('./modules/episode/episode-routing.module').then((m) => m.EpisodeRoutingModule),
    canActivate: [AuthGuard]
  },
  { path: 
    'locations', 
    loadChildren: () => import('./modules/location/location-routing.module').then((m) => m.LocationRoutingModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'login', 
    loadChildren: () => import('./modules/login/login-routing.module').then((m) => m.LoginRoutingModule) 
  },
  { 
    path: 'profile', 
    loadChildren: () => import('./modules/profile/profile-routing.module').then((m) => m.ProfileRoutingModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}