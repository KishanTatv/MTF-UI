import { Routes } from '@angular/router';
import { AppPortal } from '../layout/app-portal';

export const coreRoutes: Routes = [
  {
    path: '',
    component: AppPortal,
    children: [
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
