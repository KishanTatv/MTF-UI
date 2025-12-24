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
        path: 'users',
        loadChildren: () =>
          import('../../../app/modules/user/routes/user.routes').then(
            (m) => m.userRoutes
          ),
      },
      {
        path: 'drivers',
        loadChildren: () =>
          import('../../../app/modules/driver/routes/driver.routes').then(
            (m) => m.driverRoutes
          ),
      },
      {
        path: 'vehicles',
        loadChildren: () =>
          import('../../../app/modules/vehicle/routes/vehicle.routes').then(
            (m) => m.vehicleRoutes
          ),
      },
      {
        path: 'trips',
        loadChildren: () =>
          import('../../../app/modules/trip/routes/trip.routes').then(
            (m) => m.tripRoutes
          ),
      },
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
