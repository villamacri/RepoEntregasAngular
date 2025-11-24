import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';

export const routes: Routes = [
    {
        path:'home',
        component:HomePage
    },
    {
        path:'',
        component:HomePage,
        pathMatch:'full'
    }
];
