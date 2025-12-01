import { Routes } from '@angular/router';
import { MovieDiscoverPage } from './pages/movie-discover-page/movie-discover-page';
import { UserListsPage } from './pages/user-lists-page/user-lists-page';

export const routes: Routes = [
    {
        path:'popular',
        component:MovieDiscoverPage
    },
    {
        path: 'my-lists',
        component: UserListsPage
    },
    {
        path:'',
        component:MovieDiscoverPage,
        pathMatch:'full'
    }

];
