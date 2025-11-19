import { Routes } from '@angular/router';
import { MoviesListComponent } from './components/movies-list-component/movies-list-component';

export const routes: Routes = [
    {
        path:'popular',
        component:MoviesListComponent
    },
    {
        path:'',
        component:MoviesListComponent,
        pathMatch:'full'
    }

];
