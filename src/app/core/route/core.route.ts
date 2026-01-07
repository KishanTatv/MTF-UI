import { Routes } from '@angular/router';
import { AppPortal } from '../layout/app-portal';
import { Dashboard } from '../../modules/dashboard/component/dashboard';
import { authGuard } from '../guard/auth-guard';
import { UserRole } from '../../shared/common/enumHelper';

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
      { canActivate: [authGuard], path: 'dashboard', component: Dashboard },
      {
        path: 'users',
        canActivate: [authGuard],
        data: { role: [UserRole['Super Admin'], UserRole['Company Owner']] },
        loadChildren: () =>
          import('../../../app/modules/user/routes/user.routes').then(
            (m) => m.userRoutes
          ),
      },
      {
        path: 'drivers',
        canActivate: [authGuard],
        loadChildren: () =>
          import('../../../app/modules/driver/routes/driver.routes').then(
            (m) => m.driverRoutes
          ),
      },
      {
        path: 'dispatcher',
        canActivate: [authGuard],
        loadChildren: () =>
          import(
            '../../../app/modules/dispatcher/routes/dispatcher.routes'
          ).then((m) => m.dispatcherRoutes),
      },
      {
        path: 'vehicles',
        canActivate: [authGuard],
        loadChildren: () =>
          import('../../../app/modules/vehicle/routes/vehicle.routes').then(
            (m) => m.vehicleRoutes
          ),
      },
      {
        path: 'trips',
        canActivate: [authGuard],
        loadChildren: () =>
          import('../../../app/modules/trip/routes/trip.routes').then(
            (m) => m.tripRoutes
          ),
      },
      {
        path: 'tenant',
        canActivate: [authGuard],
        loadChildren: () =>
          import('../../../app/modules/company/routes/company.route').then(
            (m) => m.companyRoutes
          ),
      },
    ],
  },
];
