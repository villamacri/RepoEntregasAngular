import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { MovieDetail } from './components/movie-detail/movie-detail';

export const routes: Routes = [
    
    {
        path:'movie/:id',
        component:MovieDetail
    },
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
