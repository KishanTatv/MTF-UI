import { Routes } from '@angular/router';
import { AppPortal } from '../layout/app-portal';
import { Dashboard } from '../../modules/dashboard/component/dashboard';

export const coreRoutes: Routes = [
  {
    path: '',
    component: AppPortal,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      { path: 'dashboard', component: Dashboard },
      {
        path: 'company',
        loadChildren: () =>
          import('../../../app/modules/company/routes/company.route').then(
            (m) => m.companyRoutes
          ),
      },
    ],
  },
];
