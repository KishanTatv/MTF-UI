import { Routes } from '@angular/router';
import { Home } from './modules/home/home';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  {
    path: '',
    loadChildren: () =>
      import('../app/core/route/core.route').then((m) => m.coreRoutes),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/core/route/auth.route').then((m) => m.authRoutes),
  },
];
