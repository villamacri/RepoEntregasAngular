import { Routes } from '@angular/router';
import { MoviesListComponent } from './components/movies-list-component/movies-list-component';
import { MovieDetail } from './components/movie-detail/movie-detail';

export const routes: Routes = [
    {
        path:'popular',
        component:MoviesListComponent
    },
    {
        path:'movie/:id',
        component: MovieDetail
    },
    {
        path:'',
        component:MoviesListComponent,
        pathMatch:'full'
    }

];
