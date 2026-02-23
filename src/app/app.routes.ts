import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => import('./feature/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./feature/auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./feature/auth/register/register.component')
      .then(m => m.RegisterComponent)
  },
  {
    path: 'jobs',
    loadComponent: () => import('./feature/jobs/job-search/job-search.component')
      .then(m => m.JobSearchComponent)
  },
  {
    path: 'favorites',
    canActivate: [authGuard],
    loadComponent: () => import('./feature/favorite/favorit-list/favorit-list.component')
      .then(m => m.FavoritListComponent)
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('./feature/profil/profil.component').then(m => m.ProfilComponent)
  },
  {
    path: 'applications',
    canActivate: [authGuard],
    loadComponent: () => import('./feature/application-list/application-list.component').then(m => m.ApplicationListComponent)
  }

];
