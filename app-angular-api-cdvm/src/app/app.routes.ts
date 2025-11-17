import { Routes } from '@angular/router';
import { VehicleListPage } from './components/vehicle-list-page/vehicle-list-page';
import { VehicleDetailPage } from './pages/vehicle-detail-page/vehicle-detail-page';

export const routes: Routes = [
  {
    path: 'vehicles',
    component: VehicleListPage,
  },
  {
    path: 'detail/:id',
    component: VehicleDetailPage
  },
  {
    path: '',
    redirectTo: 'vehicles',
    pathMatch: 'full',
  },
];
